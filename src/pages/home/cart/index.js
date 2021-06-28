import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Css from "./index.module.scss";
import "./index.scss";
import config from 'src/config/config'

import TabBar from "src/layouts/tabBar/Index.js";
import Navbar from "components/navbar";
import { Checkbox,List } from "antd-mobile";
import AmountInput from "components/amountInput";

import action from "src/actions";

const CheckboxItem = Checkbox.CheckboxItem;
class Cart extends React.Component {

  checkBoxChange(index) {
    this.props.dispatch(action.cart.updateIndexMap(index))
  }

  changeAmount(val, obj) {
    this.props.dispatch(
      action.cart.updateCart({
        gid: obj.gid,
        amount: val,
      })
    );
  }

  goPage(url){
    this.props.history.push(config.path+url)
  }

  render() {
    return (
      <div className={Css["page"]}>
        <Navbar title="购物车" />
        <List className={Css["cart-main"]}>
          {this.props.state.cart.aCartData &&
          this.props.state.cart.aCartData.length ? (
            this.props.state.cart.aCartData.map((item, index) => {
              return (
                <CheckboxItem
                  key={index}
                  defaultChecked={false}
                  checked={
                    this.props.state.cart.indexmap[index]
                    }
                  onChange={() => this.checkBoxChange(index)}
                >
                  <div className={Css["cart-list"]}>
                    <div className={Css["image-wrap"]}>
                      <div className={Css["img"]}>
                        <img src={item.img} alt="" />
                      </div>
                      <div
                        className={Css["del"]}
                        onClick={() =>
                          this.props.dispatch(
                            action.cart.delCart({ gid: item.gid })
                          )
                        }
                      >
                        删除
                      </div>
                    </div>
                    <div className={Css["goods-wrap"]}>
                      <div className={Css["goods-title"]}>{item.title}</div>
                      <div className={Css["goods-attr"]}>
                        {item.attrs && item.attrs.length
                          ? item.attrs.map((attr, i) => {
                              return (
                                <span key={i}>
                                  {attr.title}：{attr.value}
                                </span>
                              );
                            })
                          : ""}
                      </div>
                      <div className={Css["buy-wrap"]}>
                        <div className={Css["price"]}>{item.price}</div>
                        <AmountInput
                          initialValue={item.amount}
                          input={(val) => this.changeAmount(val, item)}
                        />
                      </div>
                    </div>
                  </div>
                </CheckboxItem>
              );
            })
          ) : (
            <div className="null-item">购物车空空如也~</div>
          )}
        </List>
        <div className={Css["orderend-wrap"]}>
          <div className={Css["select-wrap"]}>
          合计：<span>{this.props.state.cart.total}</span>
          </div>
          <div className={Css["orderend-btn"]} onClick={()=>this.goPage('goods/balance')}>去结算</div>
        </div>
        <TabBar />
      </div>
    );
  }
}

export default connect((state) => {
  return {
    state: state,
  };
})(withRouter(Cart));
