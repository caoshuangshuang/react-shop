import React from "react";
import Css from "./index.module.scss";
import { getGoodsInfo } from "src/services/goods";

export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bodys:''
    };
  }

  componentDidUpdate(prevProps) {
    if(prevProps.gid!==this.props.gid){
      this.getDetail();
    }
  }

   // 获取商品详情
   getDetail() {
    let param = {
      type: "details",
      gid: this.props.gid,
    };
    getGoodsInfo(param).then((res) => {
      if (res.code === 200) {
        this.setState({ bodys:res.data.bodys });
      }
    });
  }

  render() {
    return (
      <div className={Css['page']}>
        <div className={Css['content']} dangerouslySetInnerHTML={{__html:this.state.bodys}}></div>
      </div>
    );
  }
}
