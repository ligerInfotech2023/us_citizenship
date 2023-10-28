const {Agent} = require('undici');
const crypto = require('crypto');
const NodeCache = require('node-cache')
const cache = new NodeCache();

let lastTokenRetrievalTime = 0; //timestamps of the last token retrival

const sharedAgent = new Agent({
    connect:{
            rejectUnauthorized:false,
            secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT
        }
    })
const fetchToken = async () => {
  const tokenValidityDuration = 30 * 60 * 1000; // 30 minutes in milliseconds
  try {
    const currentTimestamp = Date.now();
    const cachedToken = cache.get("token")
    if(!cachedToken || currentTimestamp - lastTokenRetrievalTime >= tokenValidityDuration){
      const tokenResponse = await fetchTokenFromApi();
      const newToken = tokenResponse.JwtResponse.accessToken;
      cache.set("token", {value: newToken, timestamp: currentTimestamp}, tokenValidityDuration)
      lastTokenRetrievalTime = currentTimestamp
      return newToken
    }else{
      return cachedToken.value;
    }
  } catch (error) {
    console.error("Error in fetchToken:", error);
    res.status(500).json({isValid:false, message:"Internal server error while fetching token", error:error.message})
  }
};


const fetchTokenFromApi = async() => {
    const tokenCheck = await fetch(process.env.AUTH_API, {
        headers: {
          "Content-Type": "application/json",
          "Host": "egov.uscis.gov",
          "Referer": "https://egov.uscis.gov/",
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
        },
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        dispatcher: sharedAgent
      });
      if(tokenCheck.status !== 200){
        throw new Error(`Token API responded with status: ${tokenCheck.status}`);
      }
      const tokenResponse = await tokenCheck.json();
      return tokenResponse;
}
const caseStatus = async(req, res) => {
    try{
        const fetchAPI = process.env.FETCH_API;
        let receiptNumber  = req.params.receiptNumber ;
        receiptNumber = receiptNumber.toUpperCase()
        if(req.params.receiptNumber !== receiptNumber){
            return res.status(400).json({ isValid: false, message: `Receipt number:${req.params.receiptNumber} must be in uppercase.` });
        }
          let responseObject = {}
          const token = await fetchToken();
          const regex = /<a[^>]*>([^<]+)<\/a>/g;
            const response = await Promise.all([
              fetch(`${fetchAPI}/${receiptNumber}`,{
                headers:{
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
                },
                method: "GET",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                dispatcher: sharedAgent
              })
            ])
            const fetchData = response[0]
        const jsonData =  await fetchData.json();
          if (fetchData.status === 200){
              responseObject = {
                isValid: jsonData ? jsonData.CaseStatusResponse.isValid : null,
                receiptNumber: jsonData ? jsonData.CaseStatusResponse.receiptNumber : null,
                formNum: jsonData ? jsonData.CaseStatusResponse.detailsEng.formNum :null,
                formTitle: jsonData ? jsonData.CaseStatusResponse.detailsEng.formTitle : null,
                actionCodeText: jsonData ? jsonData.CaseStatusResponse.detailsEng.actionCodeText : null,
                actionCodeDesc: jsonData ? jsonData.CaseStatusResponse.detailsEng.actionCodeDesc : null,           
              };          
            } else {
                return res.status(404).json({ isValid: false, message: "API Error while fetching data after token refresh" });
              }
     
            return res.status(200).json(responseObject)
      
    }catch(err){
        console.log('Error: ', err);
        return res.status(500).json({isValid: false,message: "Internal server error while fetching data",error: err.message });
    }
}

module.exports = { caseStatus };