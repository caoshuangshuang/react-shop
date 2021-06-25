import configs from "src/config/config";

function request(pUrl,pType='GET',data={}){
  let config={},headers={},params=''
  if(pType==='GET'){
    config={
      method:pType
    }
  }else{
    headers={
      'Content-Type':'application/x-www-form-urlencoded'
    }
    if(data instanceof Object){
      for(let key in data){
        params+=`&${key}=${data[key]}`
      }
      params=params.slice(1)
    }
    config={
      method:pType,
      headers,
      body:params
    }
  }
  return fetch(configs.baseUrl+pUrl,config).then(res=>res.json())
 }
 export {request}