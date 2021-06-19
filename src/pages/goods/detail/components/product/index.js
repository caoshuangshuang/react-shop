import React from "react";
import { withRouter } from "react-router-dom";
import Css from "./index.module.scss";

import { Carousel } from "antd-mobile";
import BottomBtn from "../bottomBtn";
import ReviewItem from '../reviewItem'


import { getGoodsInfo, getGoodsReviews } from "src/services/goods";


class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aSwiper: null,
      oDetail: {},
      total: 0,
      aReviews: [],
    };
  }

  componentDidUpdate(prevProps) {
    if(prevProps.gid!==this.props.gid){
      this.getDetail();
      this.getReviews();
    }
  }

  // 获取商品详情
  getDetail() {
    let param = {
      type: "details",
      gid: this.props.gid,
    };
    getGoodsInfo(param).then((res) => {
      if (res.code === 200) {
        let aSwiper = res.data.images || null;
        let oDetail = res.data || {};
        this.setState({ aSwiper, oDetail });
      }
    });
  }

  // 获取商品评价
  getReviews() {
    let param = {
      page: 1,
      gid: this.props.gid,
    };
    getGoodsReviews(param).then((res) => {
      if (res.code === 200) {
        let aReviews = res.data || [];
        let total = res.pageinfo.total || 0;
        this.setState({ aReviews, total });
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.aSwiper && this.state.aSwiper.length && (
          <Carousel autoplay={true} infinite={true}>
            {this.state.aSwiper.map((item, index) => (
              <div key={index} className={Css["swiper-wrap"]}>
                <img src={item} alt="" />
              </div>
            ))}
          </Carousel>
        )}
        <div className={Css["goods-ele-main"]}>
          <div className={Css["goods-ele-title"]}>
            {this.state.oDetail.title}
          </div>
          <div className={Css["goods-ele-price"]}>
            ￥{this.state.oDetail.price}
          </div>
          <div className={Css["goods-express-sales"]}>
            <div className={Css["text"]}>
              快递：{this.state.oDetail.freight}元
            </div>
            <div className={Css["text"]}>销量{this.state.oDetail.sales}件</div>
          </div>
        </div>
        <div className={Css["reviews-main"]}>
          <div className={Css["reviews-title"]}>
            商品评价({this.state.total})
          </div>
          {this.state.aReviews && this.state.aReviews.length
            ? this.state.aReviews.map((item, index) => (
              <ReviewItem key={index} item={item}/>
              ))
            : (
              <div className="null-item">没有任何评价</div>
            )}
          <div className={this.state.total<1?Css["reviews-more"]+' hide':Css["reviews-more"]}>查看更多评价</div>
        </div>
        <BottomBtn detail={this.state.oDetail} />
      </div>
    );
  }
}

export default withRouter(Product);
