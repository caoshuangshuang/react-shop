import config from "src/config/config";
import { request } from "utils/request";
import {genUrlParam} from 'utils/index'

// 添加地址
export const addAddress=(param={})=>{
  const args={
    token:config.token
  }
  return request(
    '/api/user/address/add'+genUrlParam(args),'POST',param
  )
}

// 收货地址列表
export const listAddress=(param={})=>{
  param.token=config.token
  return request(
    '/api/user/address/index'+genUrlParam(param),'GET',param
  )
}

// 删除收货地址
export const delAddress=(param={})=>{
  param.token=config.token
  return request(
    '/api/user/address/del'+genUrlParam(param),'GET',param
  )
}

// 获取选中的收货地址
export const getSelectAddress=(param={})=>{
  param.token=config.token
  return request(
    '/api/user/address/info'+genUrlParam(param),'GET',param
  )
}

// 获取默认收货地址
export const getDefaultAddress=(param={})=>{
  param.token=config.token
  return request(
    '/api/user/address/defaultAddress'+genUrlParam(param),'GET',param
  )
}
