import React from "react";
import Css from "./index.module.scss";
import './index.scss'

import { ListView } from "antd-mobile";
import ReviewItem from "../reviewItem";

import { getGoodsReviews } from "src/services/goods";

export default class Evaluate extends React.Component {
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      isLoading: true,
      dataSource,
      pageSize: 10,
      pageNum: 1,
      total: 0,
      hasMore: true,
      refreshing:false
    };
    this.aReviews = [];
  }

  componentDidUpdate(prevProps) {
    if (prevProps.gid !== this.props.gid) {
      this.onRefresh();
    }
  }

  // 获取商品评价
  getReviews() {
    let param = {
      page: this.state.pageNum,
      gid: this.props.gid,
    };
    getGoodsReviews(param).then((res) => {
      if (res.code === 200) {
        this.aReviews=this.state.refreshing?res.data:[...this.aReviews,...res.data]
        this.setState({
          dataSource:this.state.dataSource.cloneWithRows(this.aReviews),
          total:res.pageinfo.total,
          hasMore:this.state.pageNum<res.pageinfo.pagenum,
          isLoading:false,
          refreshing:false
         });
      }
    });
  }

  onRefresh = () => {
    this.setState({ pageNum: 1, isLoading: true,refreshing:true });
    this.getReviews();
  };

  onEndReached = () => {
    if (!this.state.hasMore&&!this.state.isLoading) {
      return
    } 
    this.setState({
      isLoading:true,
      pageNum:this.state.pageNum+1
    },()=>{
      this.getReviews()
    })
  };

  render() {
    const Header = () => {
      return (
        <div className={Css["reviews-title"]}>商品评价({this.state.total})</div>
      );
    };

    const Footer = () => {
      return (
        <div className="null-item">
          {this.state.hasMore ? "正在加载中" : "已经到底啦"}
        </div>
      );
    };

    const Separator=()=>{
      return (
        <div className={Css['split-line']}></div>
      )
    }

    const Row = (rowData, sectionId, rowId) => {
      return (
        <div key={rowId}>
          <ReviewItem item={rowData} />
        </div>
      );
    };
    return (
      <div className={Css["page"]}>
        <ListView
          useBodyScroll={true}
          dataSource={this.state.dataSource}
          renderHeader={Header}
          renderFooter={Footer}
          renderRow={Row}
          renderSeparator={Separator}
          onEndReached={this.onEndReached}
        />
      </div>
    );
  }
}
