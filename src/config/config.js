/*
 * @Description: 
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2021-03-26 10:28:00
 * @LastEditors: 曹双双
 * @LastEditTime: 2021-05-24 15:46:53
 */
let prodUrl ="http://vueshop.glbuys.com"
let devUrl=""
let baseUrl=process.env.NODE_ENV==='development'?devUrl:prodUrl

const config={
  baseUrl,
  path:'/',
  token:'1ec949a15fb709370f'
}
export default config