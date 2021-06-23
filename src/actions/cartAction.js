function addCart(data){
  return {
    type:'addCart',
    data:data
  }
}

function updateCart(data){
  return {
    type:'updateCart',
    data:data
  }
}

function delCart(data){
  return {
    type:'delCart',
    data:data
  }
}

function updateIndexMap(data){
  return {
    type:'updateIndexMap',
    data:data
  }
}

export  {
  addCart,
  updateCart,
  delCart,
  updateIndexMap,
}