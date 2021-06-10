import React from "react";
import { withRouter } from "react-router";
import config from "src/assets/js/conf/config.js";
import { request } from "src/assets/js/libs/request";
import Css from "./index.module.scss";
import { Modal } from "antd-mobile";
import { connect } from "react-redux";
import action from "src/actions";
class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aHotKeywords: null,
      keywords: "",
    };
    this.aKeywords = props.state.hk.keywords || [];
  }

  componentDidMount() {
    this.getHotKeywords();
  }

  clearHistory() {
    Modal.alert("", "确认要删除吗", [
      { text: "取消", onPress: () => {} },
      {
        text: "确认",
        onPress: () => {
          this.delHistoryKeywords();
        },
      },
    ]);
  }

  getHotKeywords() {
    request(
      config.baseUrl + "/api/home/public/hotwords?token=" + config.token
    ).then((res) => {
      if (res.code === 200) {
        this.setState({ aHotKeywords: res.data || [] });
      }
    });
  }

  addHistoryKeywords() {
    this.aKeywords.unshift(this.state.keywords);
    this.aKeywords = [...new Set(this.aKeywords)];
    this.props.dispatch(
      action.hk.addHistoryKeywords({ keywords: this.aKeywords })
    );
    this.goPage(this.state.keywords)
  }

  delHistoryKeywords() {
    this.aKeywords = [];
    this.props.dispatch(action.hk.delHistoryKeywords());
  }

  goPage(keywords) {
    if(this.props.isLocal==='1'){
      this.props.childKeywords(keywords)
      this.props.childStyle({ display: "none" })
    }else{
      this.props.history.push(config.path +'goods/search-goods?keywords='+keywords);
    }
  }

  goBack(){
    this.props.history.goBack()
  }

  render() {
    return (
      <div className={Css["page"]} style={this.props.pageStyle}>
        {/* 搜索框 */}
        <div className={Css["search-header"]}>
          <div
            className={Css["close"]}
            onClick={()=>this.goBack()}
          ></div>
          <div className={Css["search-wrap"]}>
            <div className={Css["search-input-wrap"]}>
              <input
                type="text"
                name=""
                id=""
                placeholder="请输入宝贝名称"
                onChange={(e) => {
                  this.setState({ keywords: e.target.value });
                }}
              />
            </div>
            <button
              type="button"
              className={Css["search-btn"]}
              onClick={this.addHistoryKeywords.bind(this)}
            ></button>
          </div>
        </div>
        {/* 最近搜索 */}
        <div
          className={Css["search-main"]}
          style={
            this.props.state.hk.keywords && this.props.state.hk.keywords.length
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <div className={Css["search-title-wrap"]}>
            <div className={Css["search-title"]}>最近搜索</div>
            <div
              className={Css["bin"]}
              onClick={this.clearHistory.bind(this)}
            ></div>
          </div>
          <div className={Css["search-keywords-wrap"]}>
            {this.props.state.hk.keywords && this.props.state.hk.keywords.length
              ? this.props.state.hk.keywords.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={Css["keywords"]}
                      onClick={this.goPage.bind(
                        this,
                        item
                      )}
                    >
                      {item}
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
        {/* 热门搜索 */}
        <div className={Css["search-main"]}>
          <div className={Css["search-title-wrap"]}>
            <div className={Css["search-title"]}>热门搜索</div>
          </div>
          <div className={Css["search-keywords-wrap"]}>
            {this.state.aHotKeywords && this.state.aHotKeywords.length
              ? this.state.aHotKeywords.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={Css["keywords"]}
                      onClick={this.goPage.bind(
                        this,
                       item.title
                      )}
                    >
                      {item.title}
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    state: state,
  };
})(withRouter(SearchComponent));
