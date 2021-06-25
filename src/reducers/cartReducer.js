let localCartData = localStorage["cartData"];
let localTotal = localStorage["total"];
let localIndexMap = localStorage["indexmap"];
let localFreight = localStorage["freight"];
let cartData = {
  aCartData: localCartData !== undefined ? JSON.parse(localCartData) : [],
  total: localTotal !== undefined ? parseFloat(localTotal) : 0,
  indexmap: localIndexMap !== undefined ? JSON.parse(localIndexMap) : {},
  freight: localFreight !== undefined ? parseInt(localFreight) : 0,
};

function cartReducer(state = cartData, action) {
  switch (action.type) {
    case "addCart":
      addCart(state, action);
      return Object.assign({}, state);
    case "updateCart":
      updateCart(state, action);
      return Object.assign({}, state);
    case "delCart":
      delCart(state, action);
      return Object.assign({}, state);
    case "updateIndexMap":
      updateIndexMap(state, action);
      return Object.assign({}, state);
    default:
      return state;
  }
}

// 添加商品
function addCart(state, action) {
  if (state.aCartData.length > 0) {
    let find = state.aCartData.find((ele) => ele.gid === action.data.gid);
    if (
      find &&
      JSON.stringify(find.attrs) === JSON.stringify(action.data.attrs)
    ) {
      console.log(find.amount, action.data.amount);
      find.amount = find.amount + action.data.amount;
    } else {
      state.aCartData.push(action.data);
    }
  } else {
    state.aCartData.push(action.data);
  }
  compiteFreight(state);
}

// 修改商品数量
function updateCart(state, action) {
  if (state.aCartData.length > 0) {
    let find = state.aCartData.find((ele) => ele.gid === action.data.gid);
    find.amount = action.data.amount;
    localStorage["cartData"] = JSON.stringify(state.aCartData);
    computeTotal(state);
  }
}

// 删除商品
function delCart(state, action) {
  if (state.aCartData.length > 0) {
    let index = state.aCartData.findIndex((ele) => ele.gid === action.data.gid);
    if (index !== -1) {
      state.aCartData.splice(index, 1);
    }
    delIndexMap(state,index)
    computeTotal(state);
    compiteFreight(state);
    localStorage["cartData"] = JSON.stringify(state.aCartData);
  }
}

// 同步删除indexmap中的对应键
function delIndexMap(state,index){
  delete state.indexmap[index]
  localStorage["indexmap"] = JSON.stringify(state.indexmap);
}

// 更新购物车商品是否选中map
function updateIndexMap(state, action) {
  if (state.indexmap[action.data]) {
    state.indexmap[action.data] = false;
  } else {
    state.indexmap[action.data] = true;
  }
  computeTotal(state);
  localStorage["indexmap"] = JSON.stringify(state.indexmap);
}

// 计算购物车总价
function computeTotal(state) {
  let total = 0;
  Object.keys(state.indexmap).forEach((key) => {
    if (state.indexmap[key]) {
      let cur = state.aCartData[key];
      total = parseFloat(
        parseFloat(cur.price) * parseInt(cur.amount) + parseInt(total)
      ).toFixed(2);
    }
  });
  state.total = total;
  localStorage["total"] = state.total;
}

// 计算运费
function compiteFreight(state) {
  let freightArr = state.aCartData.map((ele) => ele.freight);
  let freight = Math.max.apply(null, freightArr);
  state.freight = freight;
  localStorage["freight"] = state.freight;
}

export default cartReducer;
