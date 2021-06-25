import React from "react";
import { connect } from "react-redux";
import Css from "./index.module.scss";

class SearchBar extends React.Component {
  render() {
    return (
      <div
        className={
          this.props.bScroll
            ? Css["search-header"] + " " + Css["red-bg"]
            : Css["search-header"]
        }
      >
        <div
          className={Css["classify-icon"]}
          onClick={() => this.props.goPage("goods/classify")}
        ></div>
        <div
          className={Css["search-wrap"]}
          onClick={() => this.props.goPage("goods/search-keywords")}
        >
          <div className={Css["search-icon"]}></div>
          <div className={Css["search-text"]}>输入喜欢的宝贝名称</div>
        </div>
        <div className={Css["login-wrap"]}>
          {this.props.state.auth && this.props.state.auth.userData ? (
            <div
              className={Css["my"]}
              onClick={() => this.props.goPage("mine/index")}
            />
          ) : (
            <div
              className={Css["login-text"]}
              onClick={() => this.props.goPage("auth/login")}
            >
              登录
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default connect((state) => {
  return {
    state: state,
  };
})(SearchBar);
