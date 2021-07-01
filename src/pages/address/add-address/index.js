import React from "react";
import {connect} from 'react-redux'

import Css from "./index.module.scss";
import "./index.scss";
import { province } from "src/config/province";
import {addAddress} from 'src/services/address'
import config from 'src/config/config'

import Navbar from "components/navbar";
import { List, InputItem, Button, Picker ,Toast} from "antd-mobile";

const Item = List.Item;

class AddAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      area: null,
      name: "",
      phone: "",
      address: "",
      isDefault: false,
    };
  }

  saveForm(){
    if(this.validateForm()){
      const [province,city,area] = this.state.area
      const param={
        uid:this.props.state.auth.userData.uid,
        name:this.state.name,
        cellphone:this.state.phone,
        province,
        city,
        area,
        address:this.state.address,
        isDefault:this.state.isDefault?"1":"0"
      }
      addAddress(param).then(res=>{
        if(res.code===200){
          Toast.info('添加成功',2,()=>{
            this.goPage('address/list')
          })
        }else{
          Toast.info(res.data,2)
        }
      })
    }
  }

  goPage(pUrl){
    this.props.history.replace(config.path+pUrl)
  }

  validateForm() {
    const nullReg=/^\s*$/
    const phoneReg=/^1[0-9][0-9]{9}/
    if(this.state.name.match(nullReg)){
      Toast.info('请输入联系人姓名',2)
      return false
    }
    if(this.state.phone.match(nullReg)){
      Toast.info('请输入联系人手机号',2)
      return false
    }
    if(!this.state.phone.match(phoneReg)){
      Toast.info('手机号格式不正确',2)
      return false
    }
    if(!this.state.area||!this.state.area.length){
      Toast.info('请选择所在地区',2)
      return false
    }
    if(this.state.address.match(nullReg)){
      Toast.info('请输入详细地址',2)
      return false
    }
    return true
  }
  render() {
    return (
      <div className={Css["page"]}>
        <Navbar hasLeft={true} title="添加收货地址" />
        <List>
          <InputItem
            clear
            placeholder="收货人姓名"
            value={this.state.name}
            onChange={(val) => {
              this.setState({ name: val });
            }}
          >
            收货人
          </InputItem>
          <InputItem
            clear
            placeholder="联系人手机号"
            value={this.state.phone}
            onChange={(val) => {
              this.setState({ phone: val });
            }}
          >
            联系方式
          </InputItem>
          <Picker
            value={this.state.area}
            extra={"选择地区"}
            data={province}
            onOk={(val) => {
              this.setState({ area: val });
            }}
          >
            <Item className="custom-picker">所在地区</Item>
          </Picker>
          <InputItem
            clear
            placeholder="街道详细地址"
            value={this.state.address}
            onChange={(val) => this.setState({ address: val })}
          >
            详细地址
          </InputItem>
          <Item>
            设置为默认地址
            <input
              type="checkbox"
              className={Css["check-box"]}
              checked={this.state.isDefault}
              onChange={(e) =>
                this.setState({
                  isDefault: !this.state.isDefault,
                })
              }
            />
          </Item>
        </List>

        <Button className={Css["save-btn"]} type="primary" onClick={()=>this.saveForm()}>
          保存
        </Button>
      </div>
    );
  }
}

export default connect(state=>{
  return {
    state
  }
})(AddAddress)