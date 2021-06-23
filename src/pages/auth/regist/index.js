import React from "react";
import "./index.scss";
import Css from "./index.module.scss";
import Navbar from "components/navbar";
import { InputItem, List, Switch, Button } from "antd-mobile";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      verifyCode: "",
      password: "",
      ableGetVerify: false,
      showPassword: false,
    };
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
                  !this.state.ableGetVerify
                    ? Css["verify-btn"]
                    : Css["verify-btn"] + " " + Css["active"]
                }
              >
                获取验证码
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
        <Button type="warning" className={Css['regist-btn']}>注册</Button>
      </div>
    );
  }
}
