import React from "react";
import { connect } from "react-redux";

import config from "src/config/config";
import Css from "./index.module.scss";
import { listAddress ,delAddress} from "src/services/address";

import Navbar from "components/navbar";
import { Modal,Toast } from "antd-mobile";

class AddressList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressList: null,
    };
  }

  componentDidMount() {
    this.getAddress();
  }

  goPage(pUrl) {
    this.props.history.push(config.path + pUrl);
  }

  // 获取收货地址列表
  getAddress() {
    const param = {
      uid: this.props.state.auth.userData.uid,
    };
    listAddress(param).then((res) => {
      if (res.code === 200) {
        this.setState({ addressList: res.data || [] });
      }
    });
  }

  // 删除收货地址
  delAddress(index,aid,e) {
    e.stopPropagation()
    Modal.alert("", "确认删除吗？", [
      {
        text: "取消",
        onPress: () => {},
        style: "default",
      },
      {
        text: "确定",
        onPress: () => {
          let addressList=this.state.addressList
          addressList.splice(index,1)
          this.setState({
            addressList
          })
          let param={
            uid:this.props.state.auth.userData.uid,
            aid:aid
          }
          delAddress(param).then(res=>{
            if(res.code===200){
              Toast.info('删除成功',2)
            }
          })
        },
      },
    ]);
  }

  // 选择收货地址
  selectAddress(aid){
    sessionStorage['addressid']=aid
    this.props.history.replace(config.path+'goods/balance')
  }

  render() {
    return (
      <div className={Css["page"]}>
        <Navbar hasLeft={true} title="选择收货地址" />
        <div className={Css["main"]}>
          <div className={Css["address-nav"]}>
            <span>配送地址</span>
            <span onClick={() => this.goPage("address/add")}>
              +添加收货地址
            </span>
          </div>
          {this.state.addressList && this.state.addressList.length
            ? this.state.addressList.map((item, index) => {
                return (
                  <div key={index} className={Css["address-list"]} onClick={()=>this.selectAddress(item.aid)}>
                    <div className={Css["address-info-wrap"]}>
                      <div
                        className={
                          item.isdefault === "1" ? Css["check-mark"] : "hide"
                        }
                      ></div>
                      <div
                        className={
                          item.isdefault === "1"
                            ? Css["address-info"] + " " + Css["default"]
                            : Css["address-info"]
                        }
                      >
                        <div className={Css["person"]}>
                          {item.name} {item.cellphone}
                        </div>
                        <div className={Css["address"]}>
                          <span
                            className={
                              item.isdefault === "1" ? Css["default"] : "hide"
                            }
                          >
                            默认
                          </span>
                          <span>
                            {item.province}
                            {item.city}
                            {item.aream}
                            {item.address}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={Css["handle-wrap"]}>
                      <div className={Css["edit"]}></div>
                      <div
                        className={Css["del"]}
                        onClick={(e) => this.delAddress(index,item.aid,e)}
                      ></div>
                    </div>
                  </div>
                );
              })
            : []}
        </div>
      </div>
    );
  }
}
export default connect((state) => {
  return {
    state,
  };
})(AddressList);
