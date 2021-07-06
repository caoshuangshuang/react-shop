import React from "react";
import { connect } from "react-redux";

import Css from "./index.module.scss";
import config from 'src/config/config'
import {lastordernum} from 'src/services/order'
// import {submitOrder} from 'src/services/order'

import Navbar from "components/navbar";
// import { Toast } from "antd-mobile";

class OrderEnd extends React.Component {
  constructor(props){
    super(props)
    this.state={
      ordernum:''
    }
  }

  componentDidMount(){
    this.getOrderNum()
  }

  getOrderNum(){
    if(this.props.state.auth&&this.props.state.auth.userData){
      const param={
        uid:this.props.state.auth.userData.uid
      }
      lastordernum(param).then(res=>{
        if(res.code===200){
          this.setState({
            ordernum:res.data.ordernum
          })
        }
      })
    }
   
  }



  goPage(pUrl){
    this.props.history.push(config.path+pUrl)
  }

  render() {
    return (
      <div className={Css["page"]}>
        <Navbar hasLeft="true" title="订单结束" />
        <div className={Css['main']}>
          <div className={Css['list']+' '+Css['success']}>订购成功</div>
          <div className={Css['list']+' '+Css['ordernum']}>订单编号：{this.state.ordernum}</div>
          <div className={Css['list']}>查看订单</div>
          <div className={Css['pay-btn']}>去付款</div>
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    state,
  };
})(OrderEnd);
