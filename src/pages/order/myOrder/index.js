import React from "react";
import { connect } from "react-redux";

import Navbar from "components/navbar";
import { Tabs } from "antd-mobile";
import OrderItem from "./components/orderItem";
import ReviewItem from './components/reviewItem'

import Css from "./index.module.scss";
import { localParam } from "utils/index";
import {getMyOrder} from 'src/services/order'

class MyOrder extends React.Component {
  constructor(props) {
    const INITIAL_ORDER_STATUS = localParam(props.location.search).search
      .status||'all';
    super(props);
    this.state = {
      activeTab: INITIAL_ORDER_STATUS,
      tabs : [
        { title: "全部订单", key: "all" },
        { title: "待付款", key: "0" },
        { title: "待收货", key: "1" },
        { title: "待评价", key: "2" },
      ],
      orderData:null,
      title:'全部订单'
    };
  }

  componentDidMount() {
    this.handleTabClick(this.state.activeTab)
    this.getData()
  }

  handleTabClick(tab){
      const title=this.state.tabs.find(cur=>cur.key===tab).title||'我的订单'
        console.log()
      this.setState({activeTab:tab,title},()=>{
        this.getData()
      })
  }

  getData(){
    if(this.props.state.auth&&this.props.state.auth.userData){
      const param={
        uid:this.props.state.auth.userData.uid,
        status:this.state.activeTab
      }
      getMyOrder(param).then(res=>{
        if(res.code===200){
          this.setState({orderData:res.data})
        }else if(res.code===201){
          this.setState({orderData:[]})
        }
      })
    }
    
  }

  getTitle(){
    console.log(this.state.tabs.filter(cur=>cur.key===this.state.activeTab).title)
    return this.state.tabs.filter(cur=>cur.key===this.state.activeTab).title
  }

  render() {
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
            {
              this.state.orderData&&this.state.orderData.length?this.state.orderData.map((item,index)=>(
                <OrderItem key={index} data={item}/>
              )):''
            }
          </div>
          <div key="0">
            {
              this.state.orderData&&this.state.orderData.length?this.state.orderData.map((item,index)=>(
                <OrderItem key={index} data={item}/>
              )):''
            }
          </div>
          <div key="1">
            {
              this.state.orderData&&this.state.orderData.length?this.state.orderData.map((item,index)=>(
                <OrderItem key={index} data={item}/>
              )):''
            }
          </div>
          <div key="2">
            {
              this.state.orderData&&this.state.orderData.length?this.state.orderData.map((item,index)=>(
                <ReviewItem key={index} data={item}/>
              )):''
            }
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
