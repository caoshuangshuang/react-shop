function login(data){
  return{
    type:'login',
    data:data
  }
}

function logout(){
  return{
    type:'logout'
  }
}
export {
  login,
  logout
}