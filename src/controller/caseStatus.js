const {Agent} = require('undici');
const crypto = require('crypto');

const caseStatus = async(req, res, next) => {
    try{
        
        const fetchAPI = process.env.FETCH_API
        let receiptNumber = req.params.receiptNumber;

        receiptNumber = receiptNumber.toUpperCase()
        if(req.params.receiptNumber !== receiptNumber){
            return res.status(400).json({ status: "Failed!", message: `Receipt number:${req.params.receiptNumber} must be in uppercase.` });
        }
        let jsonData ;
        let responseObject = {};
        const tokenCheck = await fetch(`https://egov.uscis.gov/csol-api/ui-auth`, {
            headers:{
                "Content-Type":"application/json",
                "Host":"egov.uscis.gov",
                "Referer":"https://egov.uscis.gov/",
                "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
            },
            method:"GET",
            mode:"cors",
            cache:"no-cache",
            credentials:"same-origin",
            dispatcher: new Agent({
                connect:{
                    rejectUnauthorized:false,
                    secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT

                }
            })
        })
        const tokenData = await tokenCheck.json()
        const token = tokenData.JwtResponse.accessToken
        const fetchData = await fetch(`${fetchAPI}/${receiptNumber}`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization": `${tokenData.JwtResponse.tokenType} ${token}`
            },
            method:"GET",
            mode:"cors",
            cache:"no-cache",
            credentials: "same-origin",
            dispatcher: new Agent({
                connect:{
                    rejectUnauthorized:false,
                    secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT
                }
            })
        })
       if(fetchData.status === 200){
            jsonData = await fetchData.json();
            responseObject = {
                isValid: jsonData ? jsonData.CaseStatusResponse.isValid : null,
                receiptNumber : jsonData ? jsonData.CaseStatusResponse.receiptNumber : null,
                formNum: jsonData ? jsonData.CaseStatusResponse.detailsEng.formNum :null,
                formTitle: jsonData ? jsonData.CaseStatusResponse.detailsEng.formTitle : null,
                actionCodeText: jsonData ? jsonData.CaseStatusResponse.detailsEng.actionCodeText : null,
                actionCodeDesc: jsonData ? jsonData.CaseStatusResponse.detailsEng.actionCodeDesc : null,
            }
                
            const regex = /<a[^>]*>([^<]+)<\/a>/g;
            const actionCodeDesc  = responseObject.actionCodeDesc;
            const links = actionCodeDesc.match(regex)
            if(links){
                const extractedLinks = links.map(link => {
                    const text = link.match(/<a[^>]*>([^<]+)<\/a>/)[1];
                    return text;
                });
                responseObject.linkFirst = extractedLinks ? extractedLinks[0] : `No any link found`;
                responseObject.linkSecond = extractedLinks ? extractedLinks[1] : `No any link found`;
            } 
        return res.status(200).json(responseObject)
       } else {
            res.status(404).json({isValid:false, message:"API Error while fetching data", error:fetchData.statusText})
       }
    }catch(error){
        console.log('Error: ',error);
        res.status(500).json({isValid:false, message:"Internal server error while fetching data", error: error.message})
    }
}

module.exports = { caseStatus };