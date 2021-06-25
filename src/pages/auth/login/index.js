import React from "react";
import {connect} from 'react-redux'
import action from 'src/actions/index'
import "./index.scss";
import Css from "./index.module.scss";
import Navbar from "components/navbar";
import { InputItem, List, Switch, Button, Toast } from "antd-mobile";

import { userLogin} from "src/services/auth";

 class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      password: "",
      showPassword: false,
    };
    this.timer = null;
  }

  submitData() {
    const valid=this.validateForm();
    if(valid){
      const param={
        cellphone:this.state.phone.replace(/\s/g,''),
        password:this.state.password
      }
      userLogin(param).then(res=>{
        if(res.code===200){
          // this.props.history.goBack()
          this.props.dispatch(action.auth.login(res.data))
          this.props.history.goBack()
        }else{
          Toast.info(res.data,2)
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
    if (this.state.password.match(/^\s*$/)) {
      Toast.info("请输入密码", 2);
      return false;
    }
    return true;
  }
  render() {
    return (
      <div className={Css["page"]}>
        <Navbar hasLeft={true} title="会员登录" />
        <List className={Css["main"]}>
          <List.Item className={Css["input-wrap"]}>
            <InputItem
              type="phone"
              value={this.state.phone}
              onChange={(val) => {
                this.setState({ phone: val });
              }}
              placeholder="请输入手机号"
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
          点击登录
        </Button>
        <div className={Css['fastreg-wrap']}>
          <div><img src={require("src/assets/images/home/index/forget.png")} alt="忘记密码" /> 忘记密码</div>
          <div onClick={()=>{
            this.props.history.push('/auth/regist')
          }}><img src={require("src/assets/images/home/index/reg.png")} alt="快速注册" /> 快速注册</div>
        </div>
      </div>
    );
  }
}

export default connect((state)=>{
  return{
    state:state
  }
})(Login)
