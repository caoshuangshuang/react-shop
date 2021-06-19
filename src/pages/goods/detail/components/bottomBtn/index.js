import React from "react";
import Css from "./index.module.scss";
import { Toast } from "antd-mobile";

import { getGoodsInfo } from "src/services/goods";
import AmountInput from 'components/amountInput'

export default class BottomBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 1,
      bMask: false,
      sCartPanel: Css["down"],
      aAttr: [],
    };
  }

  // 显示购物控制面板
  showCartPanel() {
    this.getAttr()
    this.setState({ sCartPanel: Css["up"], bMask: true });
  }

  // 隐藏购物控制面板
  hideCartPanel() {
    this.setState({ sCartPanel: Css["down"], bMask: false });
  }

  // 加入收藏
  addFav() {
    Toast.info("收藏成功！", 2);
  }

  // 选中属性值
  selectAttr(index,vid) {
    let aAttr=[...this.state.aAttr]
    aAttr[index].selected=vid
    this.setState({aAttr})
  }

  // 检测是否选中属性值
  checkAttr(){
    let aAttr=this.state.aAttr
    if(aAttr&&aAttr.length){
      for(let item of aAttr){
        if(!item.selected){
          Toast.info('请选择'+item.title)
          return
        }
      }
    }
    return true
  }

  confirmAttr(){
    if(this.checkAttr()){
      this.hideCartPanel()
    }
  }

    // 获取商品规格属性
    getAttr() {
      let param = {
        type: "spec",
        gid: this.props.detail.gid,
      };
      getGoodsInfo(param).then((res) => {
        if (res.code === 200) {
          this.setState({aAttr:res.data})
        }
      });
    }

  render() {
    return (
      <>
        <div className={Css["bottom-btn-wrap"]}>
          <div
            className={Css["btn"] + " " + Css["fav"]}
            onClick={() => {
              this.addFav();
            }}
          >
            收藏
          </div>
          <div
            className={Css["btn"] + " " + Css["cart"]}
            onClick={() => {
              this.showCartPanel();
            }}
          >
            加入购物车
          </div>
        </div>
        <div
          className={this.state.bMask ? Css["mask"] : Css["mask"] + " hide"}
        ></div>
        <div className={Css["cart-panel"] + " " + this.state.sCartPanel}>
          <div className={Css["goods-info"]}>
            <div
              className={Css["close-panel-wrap"]}
              onClick={() => {
                this.hideCartPanel();
              }}
            >
              <div className={Css["spot"]}></div>
              <div className={Css["line"]}></div>
              <div className={Css["close"]}></div>
            </div>
            <div className={Css["goods-img"]}>
              <img src={this.props.detail.images&&this.props.detail.images.length&&this.props.detail.images[0]} alt="" />
            </div>
            <div className={Css["goods-wrap"]}>
              <div className={Css["goods-title"]}>
                {this.props.detail.title}
              </div>
              <div className={Css["price"]}>￥{this.props.detail.price}</div>
              <div className={Css["goods-code"]}>{this.props.detail.gid}</div>
            </div>
          </div>
          <div className={Css["attr-wrap"]}>
            {this.state.aAttr && this.state.aAttr.length
              ? this.state.aAttr.map((item, index) => {
                  return (
                    <div key={index} className={Css["attr-list"]}>
                      <div className={Css["attr-name"]}>颜色</div>
                      <div className={Css["val-wrap"]}>
                        {item.values && item.values.length
                          ? item.values.map((subItem, subIndex) => {
                              return (
                                <div
                                  key={subIndex}
                                  className={
                                    item.selected === subItem.vid
                                      ? Css["val"] + " " + Css["active"]
                                      : Css["val"]
                                  }
                                  onClick={() => {
                                    this.selectAttr(index,subItem.vid);
                                  }}
                                >
                                  {subItem.value}
                                </div>
                              );
                            })
                          : ""}
                      </div>
                    </div>
                  );
                })
              : ""}

            <div className={Css["amount-wrap"]}>
              <div className={Css["amount-key"]}>购买数量</div>
              <AmountInput value={this.state.value} input={(val)=>{this.setState({amount:val})}}/>
            </div>
          </div>
          <div className={Css["sure-btn"]} onClick={()=>{this.confirmAttr()}}>确定</div>
        </div>
      </>
    );
  }
}
