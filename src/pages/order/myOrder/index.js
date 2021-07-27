import React from "react";
import { connect } from "react-redux";

import Navbar from "components/navbar";
import { Tabs, Toast,PullToRefresh, ListView  } from "antd-mobile";
import OrderItem from "./components/orderItem";
import ReviewItem from "./components/reviewItem";

import Css from "./index.module.scss";
import { localParam } from "utils/index";
import { getMyOrder,reviewOrder,cancelOrder,confirmOrder } from "src/services/order";

class MyOrder extends React.Component {
  constructor(props) {
    const INITIAL_ORDER_STATUS =
      localParam(props.location.search).search.status || "all";
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    super(props);
    this.state = {
      activeTab: INITIAL_ORDER_STATUS,
      tabs: [
        { title: "全部订单", key: "all" },
        { title: "待付款", key: "0" },
        { title: "待收货", key: "1" },
        { title: "待评价", key: "2" },
      ],
      title: "全部订单",

      dataSource,
      refreshing: true,
      isLoading: true,
    };

    this.orderData = null;
    this.hasMore = true;
    this.page = 1;
    this.pageSize = 8;
  }

  componentDidMount() {
    this.handleTabClick(this.state.activeTab);
  }

  handleTabClick(tab) {
    const title =
      this.state.tabs.find((cur) => cur.key === tab).title || "我的订单";
    this.setState({ activeTab: tab, title }, () => {
      this.onRefresh();
    });
  }

  getData(){
    if(this.state.activeTab==='2'){
      this.getReviewData()
    }else{
      this.getOrderData()
    }
  }

  // 获取订单数据
  getOrderData() {
    if (this.props.state.auth && this.props.state.auth.userData) {
      const param = {
        uid: this.props.state.auth.userData.uid,
        status: this.state.activeTab,
        page: this.page,
      };
      getMyOrder(param).then((res) => {
        if (res.code === 200) {
          if (this.state.refreshing) {
            this.orderData = res.data;
          } else {
            this.orderData = [...this.orderData, ...res.data];
          }
         
        } else if (res.code === 201) {
          if(this.state.refreshing){
            this.orderData=[]
          }
        }
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.orderData),
          isLoading: false,
          refreshing: false,
        });
        this.hasMore =res.pageinfo? res.pageinfo.pagenum > res.pageinfo.page:false;
      });
    }
  }

  // 获取待评价订单
  getReviewData() {
    if (this.props.state.auth && this.props.state.auth.userData) {
      const param = {
        uid: this.props.state.auth.userData.uid,
        page: this.page,
      };
      reviewOrder(param).then((res) => {
        if (res.code === 200) {
          if (this.state.refreshing) {
            this.orderData = res.data;
          } else {
            this.orderData = [...this.orderData, ...res.data];
          }
         
        } else if (res.code === 201) {
          if(this.state.refreshing){
            this.orderData=[]
          }
        }
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.orderData),
          isLoading: false,
          refreshing: false,
        });
        this.hasMore =res.pageinfo? res.pageinfo.pagenum > res.pageinfo.page:false;
      });
    }
  }

  // 取消订单
  cancelOrder(ordernum,index){
    const param={
      uid: this.props.state.auth.userData.uid,
      ordernum
    }
    cancelOrder(param).then(res=>{
      if(res.code===200){
        this.orderData.splice(index,1)
        this.setState({dataSource: this.state.dataSource.cloneWithRows(this.orderData),})
      }
    })
  }

  // 确认收货
  confirmOrder(ordernum,index){
    const param={
      uid: this.props.state.auth.userData.uid,
      ordernum
    }
    confirmOrder(param).then(res=>{
      if(res.code===200){
        this.orderData[index].status='2'
        this.setState({dataSource: this.state.dataSource.cloneWithRows(this.orderData),})
        Toast.info(res.data,2)
      }
    })
  }

  onRefresh() {
    this.setState({ refreshing: true, isLoading: true });
    this.page = 1;
    this.getData();
  }

  onEndReached() {
    if (this.state.isLoading || !this.hasMore) {
      return;
    }
    this.setState({ isLoading: true });
    this.page += 1;
    this.getData();
  }

  getTitle() {
    return this.state.tabs.filter((cur) => cur.key === this.state.activeTab)
      .title;
  }

  render() {
    const orderRow = (rowData, sectionID, rowID) => {
      return <OrderItem data={rowData} cancelOrder={(id)=>this.cancelOrder(id,rowID)}  confirmOrder={id=>this.confirmOrder(id,rowID)}/>;
    };
    const reviewRow=(rowData, sectionID, rowID) => {
      return <ReviewItem data={rowData} />;
    };
    return (
      <div className={Css["page"]}>
        <Navbar hasLeft={true} title={this.state.title} />
        <Tabs
          tabs={this.state.tabs}
          tabBarUnderlineStyle={{ borderColor: "#f15353" }}
          tabBarActiveTextColor="#000"
          onTabClick={(tab, index) => this.handleTabClick(tab.key)}
          page={this.state.activeTab}
        >
          <div key="all">
            <ListView
              dataSource={this.state.dataSource}
              renderRow={orderRow}
              useBodyScroll
              pullToRefresh={
                <PullToRefresh
                  refreshing={this.state.refreshing}
                  onRefresh={() => {
                    this.onRefresh();
                  }}
                />
              }
              onEndReached={() => this.onEndReached()}
            ></ListView>
          </div>
          <div key="0">
            <ListView
              dataSource={this.state.dataSource}
              renderRow={orderRow}
              useBodyScroll
              pullToRefresh={
                <PullToRefresh
                  refreshing={this.state.refreshing}
                  onRefresh={() => {
                    this.onRefresh();
                  }}
                />
              }
              onEndReached={() => this.onEndReached()}
            ></ListView>
          </div>
          <div key="1">
            <ListView
              dataSource={this.state.dataSource}
              renderRow={orderRow}
              useBodyScroll
              pullToRefresh={
                <PullToRefresh
                  refreshing={this.state.refreshing}
                  onRefresh={() => {
                    this.onRefresh();
                  }}
                />
              }
              onEndReached={() => this.onEndReached()}
            ></ListView>
          </div>
          <div key="2">
          <ListView
              dataSource={this.state.dataSource}
              renderRow={reviewRow}
              useBodyScroll
              pullToRefresh={
                <PullToRefresh
                  refreshing={this.state.refreshing}
                  onRefresh={() => {
                    this.onRefresh();
                  }}
                />
              }
              onEndReached={() => this.onEndReached()}
            ></ListView>
          </div>
        </Tabs>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    state,
  };
})(MyOrder);
