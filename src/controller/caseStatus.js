const {Agent} = require('undici');
const crypto = require('crypto');
const NodeCache = require('node-cache')
const cache = new NodeCache();

const maxRetries = 3;
const retryInterval = 1000;

const sharedAgent = new Agent({
  connect:{
      rejectUnauthorized:false,
      secureOptions:crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
      keepAlive:true
    }
})

const getToken = async() => {
  try{ 
      const tokenCheck = await fetch(process.env.AUTH_API, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
      },
      method: "GET",
      dispatcher: sharedAgent
    }).then(async(res) => {
      if(res.status !== 200){
        throw new Error(`Token API responded with status: ${tokenCheck.status}`)
      }
      const token = await res.json()
      return token
    });
    return tokenCheck
  }catch(err){
    console.log('Error while getToken: ',err);
    throw new Error(err)
  }
}

const tokenFromGetApi = async() => {
  const tokenValidityDuration = 30 * 60 * 1000;
  try{
    const currentTimestamp = Date.now();
    const cachedToken = cache.get("token")
    if(!cachedToken || currentTimestamp  - cachedToken.timestamp >= tokenValidityDuration){
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

const checkCaseStatus = async(req, res, next) => {
  try{
    const fetchAPI = process.env.FETCH_API;
    let receiptNumber = req.params.receiptNumber;
    receiptNumber = receiptNumber.toUpperCase()

    if(req.params.receiptNumber !== receiptNumber){
      return res.status(400).json({isValid:false, message:`Receipt number: ${req.params.receiptNumber} must be in uppercase`})
    }    
  
    const response = await makeRequiestWithRetries(fetchAPI, receiptNumber)
    return res.status(200).json(response)
  }catch(err){
    console.log("Error: ",err);
    res.status(500).json({isValid:false, message:'Internal server error while fetching data', error:err.message})
  }
}

const makeRequiestWithRetries = async(fetchAPI, receiptNumber, retries = 0) => {
  try{
      const token = await tokenFromGetApi();
      const options = {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Connection': 'keep-alive',
        },
        dispatcher: sharedAgent

      }
      const res = await fetch(`${fetchAPI}/${receiptNumber}`, options)
      if(res.status !== 200){
        throw new Error(`Token API responded with status: ${res.status}`)
      }
      const jsonData = await res.json()
      let responseObject = {
        isValid: jsonData.CaseStatusResponse.isValid,
        receiptNumber: jsonData.CaseStatusResponse.receiptNumber,
        formNum: jsonData.CaseStatusResponse.detailsEng.formNum,
        formTitle: jsonData.CaseStatusResponse.detailsEng.formTitle,
        actionCodeText: jsonData.CaseStatusResponse.detailsEng.actionCodeText,
        actionCodeDesc: jsonData.CaseStatusResponse.detailsEng.actionCodeDesc,
      };
      return responseObject
  }catch(err){
    console.log('Error: ',err);
    if(retries < maxRetries){
      await new Promise((resolve) => setTimeout(resolve, retryInterval));
      return makeRequiestWithRetries(fetchAPI, receiptNumber, retries + 1)
    } else{
      console.log('Error:-> ',err);
      throw new Error(err);
    }
  }
}

module.exports = { checkCaseStatus };