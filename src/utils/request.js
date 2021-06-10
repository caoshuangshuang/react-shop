import config from "src/config/config";

function request(pUrl,pType='GET'){
  return fetch(config.baseUrl+pUrl,{method:pType}).then(res=>res.json())
 }
 export {request}