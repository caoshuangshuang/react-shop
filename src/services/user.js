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


