import config from "src/config/config";
import { request } from "utils/request";
import {genUrlParam} from 'utils/index'

// 会员是否注册
export const isPhoneRegist=(param={})=>{
  const args={
    token:config.token
  }
  return request(
    '/api/home/user/isreg'+genUrlParam(args),'POST',param
  )
}

// 会员注册
export const userReg=(param={})=>{
  const args={
    token:config.token
  }
  return request(
    '/api/home/user/reg'+genUrlParam(args),'POST',param
  )
}

// 会员登录
export const userLogin=(param={})=>{
  const args={
    token:config.token
  }
  return request(
    '/api/home/user/pwdlogin'+genUrlParam(args),'POST',param
  )
}

// 安全退出
export const userLogout=(param={})=>{
  const args={
    token:config.token
  }
  return request(
    '/api/home/user/safeout'+genUrlParam(args),'POST',param
  )
}


