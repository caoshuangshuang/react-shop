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
]
export default routes