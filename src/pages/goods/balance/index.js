import React from "react";
import { connect } from "react-redux";

import Css from "./index.module.scss";
import config from 'src/config/config'
import {getSelectAddress} from 'src/services/address'

import Navbar from "components/navbar";

class Balance extends React.Component {
  constructor(props){
    super(props)

    let orderList=null
    if(props.state.cart&&props.state.cart.aCartData&&props.state.cart.indexmap){
      orderList=props.state.cart.aCartData.filter((item,index)=>props.state.cart.indexmap[index])
    }else{
      orderList=[]
    }

    let payAmount=parseFloat(parseFloat(this.props.state.cart.total)+parseFloat(this.props.state.cart.freight)).toFixed(2)
    
    this.state={
      orderList,
      payAmount,
      addressInfo:{}
    }
  }

  componentDidMount(){
    this.getSelectAddress()
  }

  // 获取收货地址
  getSelectAddress(){
    if(this.props.state.auth.userData&&sessionStorage['addressid']){
      const param={
        uid:this.props.state.auth.userData.uid,
        aid:sessionStorage['addressid']
      }
      getSelectAddress(param).then(res=>{
        if(res.code===200){

          this.setState({addressInfo:res.data||{}})
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
        <Navbar hasLeft="true" title="确认订单" />
        <div className={Css["address-wrap"]} onClick={()=>this.goPage('address/list')}>
          <div className={Css["person-info"]}>
            <span>收货人：{this.state.addressInfo.name}</span>
            <span>手机号：{this.state.addressInfo.cellphone}</span>
          </div>
          <div className={Css["address"]}>
            <img
              className={Css["img"]}
              src={require("src/assets/images/home/cart/map.png")}
              alt=""
            />
            <span>收货地址：{this.state.addressInfo.province}{this.state.addressInfo.city}{this.state.addressInfo.area}{this.state.addressInfo.address}</span>
          </div>
          <div className={Css["arrow"]}></div>
          <div className={Css["address-border-wrap"]}>
            <div className={Css["trapezoid"] + " " + Css["style1"]}></div>
            <div className={Css["trapezoid"] + " " + Css["style2"]}></div>
            <div className={Css["trapezoid"] + " " + Css["style1"]}></div>
            <div className={Css["trapezoid"] + " " + Css["style2"]}></div>
            <div className={Css["trapezoid"] + " " + Css["style1"]}></div>
            <div className={Css["trapezoid"] + " " + Css["style2"]}></div>
            <div className={Css["trapezoid"] + " " + Css["style1"]}></div>
            <div className={Css["trapezoid"] + " " + Css["style2"]}></div>
            <div className={Css["trapezoid"] + " " + Css["style1"]}></div>
            <div className={Css["trapezoid"] + " " + Css["style2"]}></div>
          </div>
        </div>
        <div className={Css["goods-wrap"]}>
          {
            this.state.orderList&&this.state.orderList.length?this.state.orderList.map((item,index)=>{
              return (
                <div key={index} className={Css["goods-list"]}>
                <div className={Css["image"]}>
                  <img src={item.img} alt="" />
                </div>
                <div className={Css["goods-param"]}>
                  <div className={Css["title"]}>
                    {item.title}
                  </div>
                  <div className={Css["attr"]}>
                    {
                      item.attrs&&item.attrs.length?item.attrs.map((attr,i)=>{
                        return (
                          <span index={i}>{attr.title}：{attr.value}</span>
                        )
                      }):''
                    }
                  </div>
                  <div className={Css["amount"]}>x{item.amount}</div>
                  <div className={Css["price"]}>￥{item.price}</div>
                </div>
              </div>
              )
            }):''
          }
        </div>
        <div className={Css['total-wrap']}>
          <div className={Css['item']}>商品总额：<span>￥{this.props.state.cart.total}</span></div>
          <div className={Css['item']}>商品运费：<span>￥{this.props.state.cart.freight}</span></div>
        </div>
        <div className={Css["balance-wrap"]}>
          <div className={Css["price-wrap"]}>
            实付金额：<span>￥{this.state.payAmount}</span>
          </div>
          <div className={Css["balance-btn"]}>提交订单</div>
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    state,
  };
})(Balance);
