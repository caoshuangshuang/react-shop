/*
 * @Description:
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2021-03-23 11:08:38
 * @LastEditors: 曹双双
 * @LastEditTime: 2021-05-25 17:23:33
 */
import React from "react";
import Css from "./index.module.scss";
import config from "src/assets/js/conf/config";
import TabBar from "src/layouts/tabBar/Index.js";
import SearchBar from "./components/searchBar";
import AdSwiper from "./components/swiper";
import QuickNav from "./components/nav";
import Recommend from "./components/recommend";
import GoodsClassify from "./components/classify";

export default class IndexComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      bScroll: false,
      pageStyle: { display: "none" },
    };
    this.bScroll = true;
  }
  componentDidMount() {
    window.addEventListener("scroll", this.eventScroll.bind(this));
  }
  componentWillUnmount() {
    this.bScroll = false;
    window.removeEventListener("scroll", this.eventScroll.bind(this));
  }
  eventScroll() {
    if (this.bScroll) {
      let iScrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (iScrollTop >= 80) {
        this.setState({ bScroll: true });
      } else {
        this.setState({ bScroll: false });
      }
    }
  }

  goPage(pUrl) {
    this.props.history.push(config.path + pUrl);
  }

  showSearch(){
    this.setState({
      pageStyle:{display:'block'}
    })
  }


  render() {
    return (
      <div className={Css["page"]}>
        {/* 搜索 */}
        <SearchBar bScroll={this.state.bScroll} goClassify={()=>this.goPage('goods/classify')} goSearch={()=>this.goPage('goods/search-keywords')}/>

        {/* 轮播 */}
        <AdSwiper />

        {/* 快速导航 */}
        <QuickNav />

        {/* 商品分类 */}
        <GoodsClassify />

        {/* 为您推荐 */}
        <Recommend />

        {/* 底部tab */}
        <TabBar />
      </div>
    );
  }
}
