import React from "react";
import Css from "./index.module.scss";
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
    };
  }

  handleTabClick(tab) {
    console.log(tab)
    this.setState({
      activeTab: tab.key,
    });
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div>
        <div className={Css["details-header"]}>
          <div className={Css["back"]}></div>
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
          <div className={Css["cart-icon"]}></div>
        </div>
      </div>
    );
  }
}
