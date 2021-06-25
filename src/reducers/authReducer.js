const localUserData = localStorage.getItem("userData")
console.log(localUserData,localUserData !== undefined)
const authData={
  userData:localUserData !== undefined ? JSON.parse(localUserData) : []
}

function authReducer(state = authData, action) {
  switch (action.type) {
    case "login":
      localStorage.setItem("userData", JSON.stringify(action.data));
      return {...state,...action.data};
    case 'logout':
      state.userData=undefined
      localStorage.removeItem('userData')
      return {...state}
    default:
      return state;
  }
}

export default authReducer