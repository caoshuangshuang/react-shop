import React from "react";
import Css from "./index.module.scss";
import config from "src/config/config.js";
import { searchGoods } from "src/services/goods";
import { localParam } from "utils/index";

import SearchBar from "./components/searchBar";
import GoodsList from "./components/goodsList";
import GoodsFilter from "./components/goodsFilter";
export default class SearchGoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: "",
      bFilter: false,

      //list
      aGoods: [],
      isLoading: true,
      refreshing: false,
      total: 0,
    };
    this.hasMore = true;
    this.pageNo = 1;
    this.pageSize = 10;
  }

  componentDidMount() {
    const keywords = this.props.location.search
      ? decodeURIComponent(
          localParam(this.props.location.search).search.keywords
        )
      : "";
    this.setState({ keywords }, () => {
      this.onRefresh({ oType: "all" });
    });
  }

  getChildKeywords = (keywords) => {
    this.setState({ keywords });
    this.props.history.replace(config.path + "goods/search?keywords=");
  };

  onRefresh(val) {
    console.log("refresh", val);
    this.pageNo = 1;
    this.setState({ refreshing: true, isLoading: true }, () => {
      this.getData(val);
    });
  }

  onEndReached() {
    if (!this.state.isLoading && !this.hasMore) {
      return;
    }
    console.log("reach end");
    this.pageNo = this.pageNo + 1;
    this.setState(
      {
        isLoading: true,
      },
      () => {
        this.getData();
      }
    );
  }

  getData(val) {
    let param = {
      kwords: this.state.keywords,
      page: this.pageNo,
      pageSize: this.pageSize,
    };
    if (val && Object.keys(val).length) {
      param = { ...param, ...val };
    }

    searchGoods(param).then((res) => {
      let aGoods = [];
      let total = 0;
      if (res.code === 200) {
        aGoods = this.state.refreshing
          ? res.data
          : [...this.state.aGoods, ...res.data];
        this.hasMore = res.pageinfo.page < res.pageinfo.pagenum;
        total = res.pageinfo.total;
      }
      this.setState({ refreshing: false, isLoading: false, aGoods, total });
    });
  }

  showFilter = () => {
    this.setState({ bFilter: true });
  };

  hideFilter = () => {
    this.setState({ bFilter: false });
  };

  render() {
    return (
      <div className={Css["page"]}>
        {/* 搜索条 */}
        <SearchBar
          keywords={this.state.keywords}
          bSalesMenu={this.state.bSalesMenu}
          showFilter={this.showFilter}
          refresh={(val) => this.onRefresh(val)}
        />
        {/* 商品列表 */}
        <GoodsList
          aGoods={this.state.aGoods}
          refreshing={this.state.refreshing}
          isLoading={this.state.isLoading}
          refresh={() => this.onRefresh()}
          endReached={() => this.onEndReached()}
        />
        {/* 商品筛选 */}
        <GoodsFilter
          keywords={this.state.keywords}
          show={this.state.bFilter}
          total={this.state.total}
          hideFilter={this.hideFilter}
          showFilter={this.showFilter}
          refresh={(val) => this.onRefresh(val)}
        />
      </div>
    );
  }
}
