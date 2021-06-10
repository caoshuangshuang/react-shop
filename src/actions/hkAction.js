function addHistoryKeywords(data){
  return{
    type:'addHk',
    data:data
  }
}
function delHistoryKeywords(){
  return{
    type:'delHk'
  }
}
export {
  addHistoryKeywords,
  delHistoryKeywords
}