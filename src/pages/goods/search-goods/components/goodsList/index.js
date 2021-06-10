import React from "react";
import Css from "./index.module.scss";
import { PullToRefresh, ListView } from "antd-mobile";
import LazyLoad from "react-lazyload";

export default class GoodsList extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      dataSource,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.aGoods &&
      prevProps.aGoods.length === this.props.aGoods.length
    ) {
      return;
    }
    this.setState(
      { dataSource: this.state.dataSource.cloneWithRows(this.props.aGoods) },
      () => {}
    );
  }

  render() {
    const row = (rowData, sectionId, rowId) => {
      return (
        <div key={rowId} className={Css["goods-list"]}>
          <div className={Css["goods-image"]}>
            <LazyLoad
              height={100}
              offset={100}
              scrollContainer="#goods-wrapper"
              scroll={true}
              overflow={true}
              once={true}
              placeholder={
                <img
                  src={require("src/assets/images/common/lazyImg.jpg")}
                  height="100%"
                  alt=""
                />
              }
            >
              <img src={rowData.image} alt={rowData.title} />
            </LazyLoad>
          </div>
          <div className={Css["goods-content"]}>
            <div className={Css["goods-title"]}>{rowData.title}</div>
            <div className={Css["goods-price"]}>￥{rowData.price}</div>
            <div className={Css["goods-sales"]}>
              销量<span>{rowData.sales}</span>件
            </div>
          </div>
        </div>
      );
    };

    const footer = () => {
      return (
        <div style={{ padding: 20, textAlign: "center" }}>
          {this.state.isLoading ? "加载中..." : "已经到底啦~"}
        </div>
      );
    };

    return (
      <div id="goods-wrapper" className={Css["goods-main"]}>
        <ListView
          ref={(el) => (this.lv = el)}
          dataSource={this.state.dataSource}
          renderFooter={footer}
          renderRow={row}
          pullToRefresh={
            <PullToRefresh
              refreshing={this.props.refreshing}
              onRefresh={this.props.refresh}
            />
          }
          useBodyScroll
          onEndReached={this.props.endReached}
        />
      </div>
    );
  }
}
