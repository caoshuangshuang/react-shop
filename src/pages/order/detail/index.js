import React from "react";
import { connect } from "react-redux";

import Css from "./index.module.scss";
import config from "src/config/config";
import { getOrderDetail } from "src/services/order";
import { localParam } from "utils/index";

import Navbar from "components/navbar";
// import { Toast } from "antd-mobile";

class OrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ordernum: props.location.search
        ? localParam(props.location.search).search.ordernum
        : "",
      detail: {},
    };
    this.statusMap = {
      0: "待付款",
      1: "待收货",
      2: "待评价",
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    if (this.props.state.auth && this.props.state.auth.userData) {
      const param = {
        uid: this.props.state.auth.userData.uid,
        ordernum: this.state.ordernum,
      };
      getOrderDetail(param).then((res) => {
        if (res.code === 200) {
          this.setState({
            detail: res.data||{},
          });
        }
      });
    }
  }

  goPage(pUrl) {
    this.props.history.push(config.path + pUrl);
  }

  render() {
    return (
      <div className={Css["page"]}>
        <Navbar hasLeft="true" title="订单详情" />
        <div className={Css["main"]}>
          <div className={Css["ordernum"]}>订单编号：{this.state.ordernum}</div>
          <div className={Css["address-info"]}>
            <div className="clearfix">
              <div className={Css["name"]}>
                <img src={require("src/assets/images/common/my2.png")} alt="" />
                {this.state.detail.name}
              </div>
              <div className={Css["cellphone"]}>
                <img
                  src={require("src/assets/images/common/cellphone.png")}
                  alt=""
                />
                {this.state.detail.cellphone}
              </div>
            </div>
            <div className={Css["address"]}>
              {this.state.detail.province}
              {this.state.detail.city}
              {this.state.detail.address}
            </div>
          </div>
          <div className={Css["buy-title"]}>购买的宝贝</div>
          {this.state.detail && this.state.detail.goods && this.state.detail.goods.length
            ? this.state.detail.goods.map((item, index) => {
                return (
                  <div className={Css["goods-list"]} key={index}>
                    <div className={Css["image"]}>
                      <img src={item.image} alt="" />
                    </div>
                    <div className={Css["goods-info"]}>
                      <div className={Css["title"]}>{item.title}</div>
                      <div className={Css["attr"]}>
                        <span className={Css["num"]}>X{item.amount}</span>
                        {item.param && item.param.length
                          ? item.param.map((attr, i) => {
                              return (
                                <span key={i}>
                                  {attr.title}：{attr.value}
                                </span>
                              );       
                            })
                          : ""}
                      </div>
                    </div>

                    <div className={Css["price"]}>￥123</div>
                  </div>
                );
              })
            : ""}

          <ul className={Css["order-status"]}>
            <li>支付状态</li>
            <li>{this.statusMap[+this.state.detail.status]}</li>
          </ul>
          <div className={Css["total-wrap"]}>
            <ul className={Css["total"]}>
              <li>商品总额</li>
              <li>￥{this.state.detail.total}</li>
            </ul>
            <ul className={Css["total"]}>
              <li>+运费</li>
              <li>￥{this.state.detail.freight}</li>
            </ul>
          </div>
          <div className={Css["true-total"]}>
            <div className={Css["total"]}>
              实付金额：<span>￥{this.state.detail.truetotal}</span>
            </div>
            <div className={Css["order-time"]}>下单时间：{this.state.detail.ordertime}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    state,
  };
})(OrderDetail);
