const {createProxyMiddleware } =require('http-proxy-middleware')

module.exports=function(app){
  app.use('/api',createProxyMiddleware ({
    target:'http://vueshop.glbuys.com',
    changeOrigin:true,
    // pathRewrite:{
    //   '^api':''
    // }
  }))
}