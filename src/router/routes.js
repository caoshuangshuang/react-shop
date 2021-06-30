import asyncComponents from "components/async/AsyncComponent";

const routes=[
  {
    name:'首页',
    key:'home',
    icon:'home',
    path:'home/index',
    component:asyncComponents(() => import("pages/home/index/index.js")),
    isTabBar:true
  },
  {
    name:'购物车',
    key:'cart',
    icon:'cart',
    path:'cart/index',
    component:asyncComponents(() => import("pages/home/cart/index.js")),
    isTabBar:true
  },
  {
    name:'我的',
    key:'mine',
    icon:'mine',
    path:'mine/index',
    component:asyncComponents(() => import("pages/home/mine/index.js")),
    isTabBar:true
  },
  {
    name:'分类',
    key:'classify',
    path:'goods/classify',
    component:asyncComponents(()=>import('pages/goods/classify')),
  },
  {
    name:'商品搜索',
    path:'goods/search-goods',
    component:asyncComponents(()=>import('pages/goods/search-goods')),
  },
  {
    name:'关键字搜索',
    path:'goods/search-keywords',
    component:asyncComponents(()=>import('pages/goods/search-keywords')),
  },
  {
    name:'商品详情',
    path:'goods/detail',
    component:asyncComponents(()=>import('pages/goods/detail')),
  },
  {
    name:'会员登录',
    path:'auth/login',
    component:asyncComponents(()=>import('pages/auth/login')),
  },
  {
    name:'会员注册',
    path:'auth/regist',
    component:asyncComponents(()=>import('pages/auth/regist')),
  },
  {
    name:'订单结算',
    path:'goods/balance',
    component:asyncComponents(()=>import('pages/goods/balance')),
  },
  {
    name:'添加收货地址',
    path:'address/add',
    component:asyncComponents(()=>import('pages/address/add-address')),
  },
  {
    name:'管理收货地址',
    path:'address/list',
    component:asyncComponents(()=>import('pages/address/manage-address')),
  },
]
export default routes