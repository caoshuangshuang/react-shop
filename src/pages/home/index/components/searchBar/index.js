import React from "react";
import Css from "./index.module.scss";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

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
          onClick={()=>this.props.goClassify()}
        ></div>
        <div
          className={Css["search-wrap"]}
          onClick={()=>this.props.goSearch()}
        >
          <div className={Css["search-icon"]}></div>
          <div className={Css["search-text"]}>输入喜欢的宝贝名称</div>
        </div>
        <div className={Css["login-wrap"]}>
          <div className={Css["login-text"]}>登录</div>
        </div>
      </div>
    );
  }
}
export default SearchBar;
