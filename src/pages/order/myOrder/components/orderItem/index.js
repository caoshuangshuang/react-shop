import React from "react";
import Css from "./index.module.scss";
import { Modal } from "antd-mobile";

function OrderItem(props) {
  const statusMap = {
    0: "待付款",
    1: "待收货",
    2: "待评价",
  };

  function cancelOrder(id) {
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

  function confirmOrder(id){
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
  return (
    <div className={Css["order-list"]}>
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
            onClick={() => cancelOrder(props.data.ordernum)}
          >
            取消订单
          </div>
        ) : props.data.status === "1" ? (
          <div
            className={Css["status-btn"]}
            onClick={() => confirmOrder(props.data.ordernum)}
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

export default OrderItem;
