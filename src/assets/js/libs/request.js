function request(pUrl,pType='GET'){
 return fetch(pUrl,{method:pType}).then(res=>res.json())
}
export {request}