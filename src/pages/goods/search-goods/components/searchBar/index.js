import React from "react";
import Css from "./index.module.scss";
import {withRouter} from 'react-router-dom'
import config from "src/config/config.js";
 class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bPriceMenu: false,
      bSalesMenu: false,
    };
  }

  // 显示隐藏价格排序
  handlePriceOrder() {
    this.setState({
      bPriceMenu: !this.state.bPriceMenu,
      bSalesMenu: false,
    });
  }

  checkedPriceOrder(val) {
    this.props.refresh({ oType: val });
  }

  // 显示隐藏销量排序
  handleSalesOrder() {
    this.setState({
      bSalesMenu: !this.state.bSalesMenu,
      bPriceMenu: false,
    },()=>{
      if(this.state.bSalesMenu){
        this.props.refresh({ oType: "sales" });
      }else{
        this.props.refresh();
      }
    });
   
  }

  goPage(url) {
    this.props.history.push(config.path + url);
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className={Css["search-top"]}>
        <div className={Css["search-header"]}>
          <div className={Css["back"]} onClick={() => this.goBack()}></div>
          <div
            className={Css["search-wrap"]}
            onClick={() => this.goPage("goods/search-keywords")}
          >
            <div className={Css["search-icon"]} />
            <div className={Css["search-text"]}>
              {this.props.keywords ? this.props.keywords : "请输入宝贝名称"}
            </div>
          </div>
          <div
            className={Css["search-btn"]}
            onClick={() => this.props.showFilter()}
          >
            筛选
          </div>
        </div>
        <div className={Css["order-main"]}>
          <div
            className={
              this.state.bPriceMenu
                ? Css["order-item"] + " " + Css["active"]
                : Css["order-item"]
            }
            onClick={this.handlePriceOrder.bind(this)}
          >
            <div className={Css["order-text"]}>综合</div>
            <div className={Css["order-icon"]}></div>
            <ul className={Css["order-menu"]}>
              <li
                className={this.props.oType === "all" ? Css["active"] : ""}
                onClick={this.checkedPriceOrder.bind(this, "all")}
              >
                综合
              </li>
              <li
                className={this.props.oType === "up" ? Css["active"] : ""}
                onClick={this.checkedPriceOrder.bind(this, "up")}
              >
                价格从高到低
              </li>
              <li
                className={this.props.oType === "down" ? Css["active"] : ""}
                onClick={this.checkedPriceOrder.bind(this, "down")}
              >
                价格从低到高
              </li>
            </ul>
          </div>
          <div
            className={
              this.state.bSalesMenu
                ? Css["order-item"] + " " + Css["active"]
                : Css["order-item"]
            }
            onClick={this.handleSalesOrder.bind(this)}
          >
            <div className={Css["order-text"]}>销量</div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SearchBar)