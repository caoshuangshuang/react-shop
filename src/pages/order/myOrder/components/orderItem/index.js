import React from "react";
import {withRouter} from 'react-router-dom'

import Css from "./index.module.scss";
import { Modal } from "antd-mobile";
import config from 'src/config/config'

function OrderItem(props) {
  const statusMap = {
    0: "待付款",
    1: "待收货",
    2: "待评价",
  };

  function cancelOrder(id,e) {
    e.stopPropagation()
    Modal.alert("", "确认取消订单吗？", [
      { text: "取消", onPress: () => {} },
      {
        text: "确认",
        onPress: () => {
          props.cancelOrder(id);
        },
      },
    ]);
  }

  function confirmOrder(id,e){
    e.stopPropagation()
    Modal.alert("", "确定您已收货？", [
      { text: "取消", onPress: () => {} },
      {
        text: "确认",
        onPress: () => {
          props.confirmOrder(id);
        },
      },
    ]);
  }

  function goDetail(num){
    props.history.push(config.path+'order/detail?ordernum='+num)
  }
  return (
    <div className={Css["order-list"]} onClick={()=>goDetail(props.data.ordernum)}>
      <div className={Css["ordernum-wrap"]}>
        <div className={Css["ordernum"]}>订单编号：{props.data.ordernum}</div>
        <div className={Css["status"]}>{statusMap[props.data.status]}</div>
      </div>
      {props.data.goods && props.data.goods.length
        ? props.data.goods.map((item, index) => (
            <div key={index} className={Css["item-list"]}>
              <div className={Css["image"]}>
                <img src={item.image} alt={item.title} />
              </div>
              <div className={Css["title"]}>{item.title}</div>
              <div className={Css["amount"]}>x{item.amount}</div>
            </div>
          ))
        : ""}
      <div className={Css["total-wrap"]}>
        <div className={Css["total"]}>实付金额：{props.data.total}</div>
        {props.data.status === "0" ? (
          <div
            className={Css["status-btn"]}
            onClick={(e) => cancelOrder(props.data.ordernum,e)}
          >
            取消订单
          </div>
        ) : props.data.status === "1" ? (
          <div
            className={Css["status-btn"]}
            onClick={(e) => confirmOrder(props.data.ordernum,e)}
          >
            确认收货
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default withRouter(OrderItem);
