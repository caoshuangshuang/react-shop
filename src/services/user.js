import config from "src/config/config";
import { request } from "utils/request";
import {genUrlParam} from 'utils/index'

// 获取会员信息
export const getUserInfo=(param={})=>{
    param.token=config.token
  return request(
    '/api/user/myinfo/userinfo'+genUrlParam(param),
  )
}

// 上传头像
export const uploadHead=(param={})=>{
  let args={
    token:config.token
  }
  return request(
    '/api/user/myinfo/formdatahead'+genUrlParam(args),'file',param
  )
}

// 保存个人信息
export const editUserInfo=(param={})=>{
  let args={
    token:config.token
  }
  return request(
    '/api/user/myinfo/updateuser'+genUrlParam(args),'post',param
  )
}


