import React from "react";
import Css from "./index.module.scss";
import Product from "./components/product";
import Detail from "./components/detail";
import Evaluate from "./components/evaluate";

import { setScrollTop, localParam } from "utils/index";
export default class GoodDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        { title: "商品", key: "product" },
        { title: "详情", key: "detail" },
        { title: "评价", key: "evaluate" },
      ],
      activeTab: "product",
      gid: "",
    };
  }

  componentDidMount() {
    setScrollTop();
    this.initGid();
  }

  initGid() {
    let gid = localParam(this.props.location.search).search.gid || "";
    this.setState({ gid });
  }

  handleTabClick(tab) {
    console.log(tab);
    this.setState({
      activeTab: tab.key,
    });
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <>
        <div className={Css["details-header"]}>
          <div
            className={Css["back"]}
            onClick={() => {
              this.goBack();
            }}
          ></div>
          <div className={Css["tab-wrap"]}>
            {this.state.tabs.map((tab) => (
              <div
                key={tab.key}
                className={
                  this.state.activeTab === tab.key
                    ? Css["tab-name"] + " " + Css["active"]
                    : Css["tab-name"]
                }
                onClick={() => this.handleTabClick(tab)}
              >
                {tab.title}
              </div>
            ))}
          </div>
          <div className={Css["cart-icon"]}>
            <div className={Css["spot"]}></div>
          </div>
        </div>
        <div
          className={
            this.state.activeTab === "product"
              ? Css["show-ctn"]
              : Css["hide-ctn"]
          }
        >
          <Product gid={this.state.gid} />
        </div>
        <div
          className={
            this.state.activeTab === "detail"
              ? Css["show-ctn"]
              : Css["hide-ctn"]
          }
        >
          <Detail gid={this.state.gid} />
        </div>
        <div
          className={
            this.state.activeTab === "evaluate"
              ? Css["show-ctn"]
              : Css["hide-ctn"]
          }
        >
          <Evaluate gid={this.state.gid} />
        </div>
      </>
    );
  }
}
