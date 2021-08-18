import config from "src/config/config";
import { request } from "utils/request";
import {genUrlParam} from 'utils/index'

// 提交订单
export const submitOrder=(param={})=>{
  const args={
    token:config.token
  }
  return request(
    '/api/order/add'+genUrlParam(args),'POST',param
  )
}

// 获取订单编号
export const lastordernum=(param={})=>{
  param.token=config.token
  return request(
    '/api/order/lastordernum'+genUrlParam(param)
  )
}

// 我的订单
export const getMyOrder=(param={})=>{
  param.token=config.token
  return request(
    '/api/user/myorder/index'+genUrlParam(param)
  )
}

// 取消订单
export const cancelOrder=(param={})=>{
  param.token=config.token
  return request(
    '/api/user/myorder/clearorder'+genUrlParam(param)
  )
}

// 确认收货
export const confirmOrder=(param={})=>{
  param.token=config.token
  return request(
    '/api/user/myorder/finalorder'+genUrlParam(param)
  )
}

// 我的待评价订单
export const reviewOrder=(param={})=>{
  param.token=config.token
  return request(
    '/api/user/myorder/reviewOrder'+genUrlParam(param)
  )
}

// 订单详情
export const getOrderDetail=(param={})=>{
  param.token=config.token
  return request(
    '/api/user/myorder/desc'+genUrlParam(param)
  )
}