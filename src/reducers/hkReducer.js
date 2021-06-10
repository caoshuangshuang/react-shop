const aKeywords = localStorage.getItem("hk")&&localStorage.getItem("hk")!==undefined&&localStorage.getItem("hk")!=='undefined'
  ? JSON.parse(localStorage.getItem("hk"))
  : [];

function hkReducer(state = { keywords: aKeywords }, action) {
  switch (action.type) {
    case "addHk":
      const newState={ ...state, ...action.data }
      localStorage.setItem("hk", JSON.stringify(newState.keywords));
      return newState;
    case "delHk":
      localStorage.removeItem("hk");
      return { ...state, ...{ keywords: [] } };
    default:
      return state;
  }
}

export default hkReducer