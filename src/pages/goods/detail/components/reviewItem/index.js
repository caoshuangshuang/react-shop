import React from "react";
import Css from "./index.module.scss";
export default function ReviewItem(props) {
  return (
    <div className={Css["reviews-wrap"]}>
      <div className={Css["reviews-list"]}>
        <div className={Css["uinfo"]}>
          <div className={Css["head"]}>
            <img src={props.item.head} alt="" />
          </div>
          <div className={"nickname"}>{props.item.nickname}</div>
        </div>
      </div>
      <div className={Css["reviews-content"]}>{props.item.content}</div>
      <div className={Css["reviews-time"]}>{props.item.times}</div>
    </div>
  );
}
