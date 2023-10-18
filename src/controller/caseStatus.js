const {Agent} = require('undici');
const crypto = require('crypto');

let cachedToken = null;

const sharedAgent = new Agent({
    connect:{
            rejectUnauthorized:false,
            secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT
        }
    })
const fetchToken = async() => {
   
    const tokenResponse = await fetchTokenFromApi();
    const tokenData = await tokenResponse;
    cachedToken = tokenData.JwtResponse.accessToken;
    
  
    return cachedToken;
}

const fetchTokenFromApi = async() => {
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
        dispatcher: sharedAgent
    })
    if (tokenCheck.status !== 200) {
        throw new Error(`Token API responded with status: ${tokenResponse.status}`);
      }
    const tokenResponse = await tokenCheck.json()
    return tokenResponse
}
const caseStatus = async(req, res, next) => {
    try{
        
        const fetchAPI = process.env.FETCH_API
        let receiptNumber = req.params.receiptNumber;

        receiptNumber = receiptNumber.toUpperCase()
        if(req.params.receiptNumber !== receiptNumber){
            return res.status(400).json({ status: "Failed!", message: `Receipt number:${req.params.receiptNumber} must be in uppercase.` });
        }
        const token = await fetchToken()
        let jsonData ;
        let responseObject = {};
        const fetchData = await fetch(`${fetchAPI}/${receiptNumber}`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`,
            },
            method:"GET",
            mode:"cors",
            cache:"no-cache",
            credentials: "same-origin",
            dispatcher: sharedAgent
        })
        const regex = /<a[^>]*>([^<]+)<\/a>/g;
        jsonData = await fetchData.json();
       if(fetchData.status === 200){
            responseObject = {
                isValid: jsonData ? jsonData.CaseStatusResponse.isValid : null,
                receiptNumber : jsonData ? jsonData.CaseStatusResponse.receiptNumber : null,
                formNum: jsonData ? jsonData.CaseStatusResponse.detailsEng.formNum :null,
                formTitle: jsonData ? jsonData.CaseStatusResponse.detailsEng.formTitle : null,
                actionCodeText: jsonData ? jsonData.CaseStatusResponse.detailsEng.actionCodeText : null,
                actionCodeDesc: jsonData ? jsonData.CaseStatusResponse.detailsEng.actionCodeDesc : null,
            }
                
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
       } else if(fetchData.status === 401){
            if(jsonData.error === 'Unauthorized'){
                const newToken = await fetchToken();
                const retryResponse = await fetch(`${fetchAPI}/${receiptNumber}`, {
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${newToken}`,
                    },
                    method: "GET",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    dispatcher: sharedAgent
                });
                  if (retryResponse.status === 200) {
                    const retryData = await retryResponse.json()
                    const retryResponseObject = {
                        isValid: retryData.CaseStatusResponse.isValid || null,
                        receiptNumber: retryData.CaseStatusResponse.receiptNumber || null,
                        formNum: retryData.CaseStatusResponse.detailsEng.formNum || null,
                        formTitle: retryData.CaseStatusResponse.detailsEng.formTitle || null,
                        actionCodeText: retryData.CaseStatusResponse.detailsEng.actionCodeText || null,
                        actionCodeDesc: retryData.CaseStatusResponse.detailsEng.actionCodeDesc || null,
                      };
                      const retryActionCodeDesc = retryResponseObject.actionCodeDesc;
                      const retryLinks = retryActionCodeDesc.match(regex)
                      if (retryLinks) {
                        const retryExtractedLinks = retryLinks.map(link => {
                          const text = link.match(/<a[^>]*>([^<]+)<\/a>/)[1];
                          return text;
                        });
          
                        retryResponseObject.linkFirst = retryExtractedLinks[0] || "No link found";
                        retryResponseObject.linkSecond = retryExtractedLinks[1] || "No link found";
                      }
                      return res.status(200).json(retryResponseObject);
                      
                  } else {
                    res.status(404).json({ isValid: false, message: "API Error while fetching data after token refresh", error: retryResponse.statusText });
                  }
            }
            res.status(401).json({ isValid: false, message: "Unauthorized", error: jsonData.error })
       }
        else {
            res.status(404).json({isValid:false, message:"API Error while fetching data", error:fetchData.statusText})
       }
    }catch(error){
        console.log('Error: ',error);
        res.status(500).json({isValid:false, message:"Internal server error while fetching data", error: error.message})
    }
}

module.exports = { caseStatus };