import config from "src/config/config";
import { request } from "utils/request";
import {genUrlParam} from 'utils/index'

// 获取轮播图
export const getSlide=(param={})=>{
  param.token=config.token
 return request(
     "/api/home/index/slide" + genUrlParam(param)
  )
}

// 获取快速导航
export const getNav=(param={})=>{
  param.token=config.token
  return request(
      "/api/home/index/nav" + genUrlParam(param)
   )
}

// 获取首页推荐商品
export const getRecom=(param={})=>{
  param.token=config.token
  return request(
    '/api/home/index/recom'+genUrlParam(param)
  )
}

// 获取分类商品
export const getGoodsLevel=(param={})=>{
  param.token=config.token
  return request(
    '/api/home/index/goodslevel'+genUrlParam(param)
  )
}
