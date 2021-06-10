/*
 * @Description: 
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2021-03-26 10:28:00
 * @LastEditors: 曹双双
 * @LastEditTime: 2021-04-20 19:45:20
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