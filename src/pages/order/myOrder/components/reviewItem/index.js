import React from "react";
import Css from "./index.module.scss";

function ReviewItem(props) {
  const statusMap={
    "0":'待付款',
    "1":'待收货',
    "2":'待评价'
  }
    return (
      <div className={Css["order-list"]}>
        <div className={Css['ordernum-wrap']}>
          <div className={Css['ordernum']}>订单编号：{props.data.ordernum}</div>
          <div className={Css['status']}>{statusMap[props.data.status]}</div>
        </div>
        {
          props.data.goods&&props.data.goods.length?props.data.goods.map((item,index)=>(
            <div key={index} className={Css['item-list']}>
            <div className={Css['image']}>
              <img src={item.image} alt={item.title} />
            </div>
            <div className={Css['title']}>{item.title}</div>
            <div className={Css['amount']}>x{item.amount}</div>
            <div className={Css['status-btn']}>评价</div>
          </div>
          )):''
        }
        <div className={Css['total-wrap']}>
          <div className={Css['total']}>实付金额：￥{props.data.total}</div>
        </div>
      </div>
    );
}

export default ReviewItem
