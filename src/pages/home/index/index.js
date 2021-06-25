/*
 * @Description:
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2021-03-23 11:08:38
 * @LastEditors: 曹双双
 * @LastEditTime: 2021-06-25 15:39:24
 */
import React from "react";
import Css from "./index.module.scss";
import config from "src/config/config";
import TabBar from "src/layouts/tabBar/Index.js";
import SearchBar from "./components/searchBar";
import AdSwiper from "./components/swiper";
import QuickNav from "./components/nav";
import Recommend from "./components/recommend";
import GoodsClassify from "./components/classify";

import {setScrollTop} from 'utils/index'

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
    setScrollTop()
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
        <SearchBar bScroll={this.state.bScroll} goPage={(url)=>this.goPage(url)} />

        {/* 轮播 */}
        <AdSwiper />

        {/* 快速导航 */}
        <QuickNav goPage={(url)=>this.goPage(url)}/>

        {/* 商品分类 */}
        <GoodsClassify goPage={(url)=>this.goPage(url)}/>

        {/* 为您推荐 */}
        <Recommend goPage={(url)=>this.goPage(url)}/>

        {/* 底部tab */}
        <TabBar />
      </div>
    );
  }
}
