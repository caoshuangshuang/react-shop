import React from "react";
import "./index.scss";
import Css from "./index.module.scss";
import Navbar from "components/navbar";
import { InputItem, List, Switch, Button, Toast } from "antd-mobile";

import { isPhoneRegist ,userReg} from "src/services/auth";

export default class Regist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      verifyCode: "",
      password: "",
      ableGetVerify: false,
      showPassword: false,
      countDown: 60,
      ableReget: true,
    };
    this.timer = null;
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  async getVerifyCode() {
    if (this.state.ableGetVerify&&this.state.ableReget) {
      const isReg=await this.isPhoneRegist()
      if(!isReg){
        Toast.info("验证码已发送", 2);
        this.beginTimer();
      }else{
        Toast.info('该手机号已注册')
      }
    }
  }

  beginTimer() {
    this.setState({ ableReget: false });
    this.timer = setInterval(() => {
      if (this.state.countDown < 1) {
        this.clearTimer();
      } else {
        this.setState({ countDown: this.state.countDown - 1 });
      }
    }, 1000);
  }

  submitData() {
    const valid=this.validateForm();
    if(valid){
      const param={
        vcode:this.state.verifyCode,
        cellphone:this.state.phone.replace(/\s/g,''),
        password:this.state.password
      }
      userReg(param).then(res=>{
        if(res.code===200){
          Toast.info('注册成功',2)
          this.props.history.goBack()
        }
      })
    }
  }

  async validateForm() {
    if (this.state.phone.match(/^\s*$/)) {
      Toast.info("请输入手机号", 2);
      return false;
    }
    if (this.state.phone.length !== 13) {
      Toast.info("请输入正确手机号");
      return false;
    }
    if (await this.isPhoneRegist()) {
      Toast.info("该手机号已注册", 2);
    }
    if (this.state.verifyCode.match(/^\s*$/)) {
      Toast.info("请输入验证码", 2);
      return false;
    }
    if (this.state.password.match(/^\s*$/)) {
      Toast.info("请输入密码", 2);
      return false;
    }
    return true;
  }

  clearTimer() {
    this.setState({ countDown: 60, ableReget: true });
    clearInterval(this.timer);
  }
// 会员是否注册
  isPhoneRegist() {
    const param = {
      username:this.state.phone.replace(/\s/g,'')
    };
    return isPhoneRegist(param).then((res) => {
      if (res.code === 200) {
        return +res.data.isreg === 1 ? true : false;
      }else{
        return false
      }
    });
  }
  render() {
    return (
      <div className={Css["page"]}>
        <Navbar hasLeft={true} title="会员注册" />
        <List className={Css["main"]}>
          <List.Item
            className={Css["input-wrap"]}
            extra={
              <div
                className={
                  this.state.ableGetVerify && this.state.ableReget
                    ? Css["verify-btn"] + " " + Css["active"]
                    : Css["verify-btn"]
                }
                onClick={() => this.getVerifyCode()}
              >
                {this.state.ableReget
                  ? "获取验证码"
                  : this.state.countDown + "s后获取"}
              </div>
            }
          >
            <InputItem
              type="phone"
              value={this.state.phone}
              onChange={(val) => {
                this.setState({ phone: val, ableGetVerify: val.length === 13 });
              }}
              placeholder="请输入手机号"
            />
          </List.Item>
          <List.Item className={Css["input-wrap"]}>
            <InputItem
              type="text"
              value={this.state.verifyCode}
              onChange={(val) => {
                this.setState({ verifyCode: val });
              }}
              placeholder="请输入短信验证码"
            />
          </List.Item>
          <List.Item
            className={Css["input-wrap"]}
            extra={
              <Switch
                checked={this.state.showPassword}
                onChange={() => {
                  this.setState({
                    showPassword: !this.state.showPassword,
                  });
                }}
              />
            }
          >
            <InputItem
              type={this.state.showPassword ? "text" : "password"}
              value={this.state.password}
              onChange={(val) => {
                this.setState({ password: val });
              }}
              placeholder="请输入密码"
            />
          </List.Item>
        </List>
        <Button
          type="warning"
          className={Css["regist-btn"]}
          onClick={() => this.submitData()}
        >
          注册
        </Button>
      </div>
    );
  }
}
