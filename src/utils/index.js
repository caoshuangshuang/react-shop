import echo from 'src/assets/libs/echo.js'

function genUrlParam(param={}){
  if(!Object.keys(param).length){
    return ''
  }else{
    let arr=[]
    for(let key of Object.keys(param)){
      arr.push(key+'='+param[key])
    }
    return '?'+arr.join('&')
  }
}

function lazyImg(){
  echo.init({
    offset:100,//可视区域多少像素可以被加载
    throttle:0//设置图片延迟加载的时间
  })
}

function localParam(search,hash){
  search=search||window.location.search
  hash=hash||window.location.hash
  var fn=function(str,req){
    if(str){
      var data={};
      str.replace(req,function($0,$1,$2,$3){
        data[$1]=$3;
      });
      return data;
    }
  }
  return {
    search:fn(search,new RegExp("([^?=&]+)(=([^&]*))?","g"))||{},
    hash:fn(hash,new RegExp("([^#=&]+)(=([^&]*))?","g"))||{}
  };
}

function setScrollTop(val=0){
  setTimeout(()=>{
    document.body.scrollTop=val
    document.documentElement.scrollTop=val
  })
}
export {lazyImg,localParam,genUrlParam,setScrollTop}