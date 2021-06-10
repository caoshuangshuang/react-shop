import config from "src/config/config";
import { request } from "utils/request";
import {genUrlParam} from 'utils/index'

// 获取商品分类
export const getGoodsClassify=(param={})=>{
  param.token=config.token
  return request(
    '/api/home/category/menu'+genUrlParam(param)
  )
}

// 获取某个分类下的商品
export const getClassifyGoods=(param={})=>{
  param.token=config.token
  return request(
    '/api/home/category/show'+genUrlParam(param)
  )
}

// 搜索商品
export const searchGoods=(param={})=>{
  param.token=config.token
  return request(
    '/api/home/goods/search'+genUrlParam(param)
  )
}

// 获取搜素属性
export const getParam=(param={})=>{
  param.token=config.token
  return request(
    '/api/home/goods/param'+genUrlParam(param)
  )
}