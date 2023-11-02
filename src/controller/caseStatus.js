const {Agent} = require('undici');
const crypto = require('crypto');
const NodeCache = require('node-cache')
const cache = new NodeCache();

let lastTokenRetrievalTime = 0;

const sharedAgent = new Agent({
    connect:{
            rejectUnauthorized:false,
            secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT
        }
    })
const tokenFromGetApi = async() => {
  const tokenValidityDuration = 30 * 60 * 1000;
  try{
    const currentTimestamp = Date.now();
    const cachedToken = cache.get("token")
    if(!cachedToken || currentTimestamp  - lastTokenRetrievalTime >= tokenValidityDuration){
      const tokenCheck = await getToken()
      const newToken = tokenCheck.JwtResponse.accessToken;
      cache.set("token", {value: newToken, timestamp: currentTimestamp}, tokenValidityDuration)
      lastTokenRetrievalTime = currentTimestamp
      return newToken
    }else{
      return cachedToken.value
    }
  }catch(err){
    throw new Error(err)
  }
}
const getToken = async() => {
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
      const token = await tokenFromGetApi()
        const response = await fetch(`${fetchAPI}/${receiptNumber}`, {
            headers: {
              "Accept": "*/*",
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
              "Connection": `keep-alive`,
              "Host": "egov.uscis.gov",
              "Referer": "https://egov.uscis.gov/",
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
            },
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            Host: "egov.uscis.gov",
            credentials: "same-origin",
            dispatcher: sharedAgent,
          }).then(async(res) => {
            const jsonData = await res.json();
            let responseObject = {
              isValid: jsonData.CaseStatusResponse.isValid,
              receiptNumber: jsonData.CaseStatusResponse.receiptNumber,
              formNum: jsonData.CaseStatusResponse.detailsEng.formNum,
              formTitle: jsonData.CaseStatusResponse.detailsEng.formTitle,
              actionCodeText: jsonData.CaseStatusResponse.detailsEng.actionCodeText,
              actionCodeDesc: jsonData.CaseStatusResponse.detailsEng.actionCodeDesc
            }
            return responseObject
          }).catch((err) => {
            console.log("error-> ",err);
            throw new Error(err)
          })
        return res.status(200).json(response)

  }catch(err){
      console.log('Error: ', err);
      return res.status(500).json({isValid: false,message: "Internal server error while fetching data",error: err.message });
  }
}

module.exports = { caseStatus };