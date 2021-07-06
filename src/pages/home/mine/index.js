import React from "react";
import { connect } from "react-redux";

import {Modal} from 'antd-mobile'
import TabBar from "src/layouts/tabBar/Index.js";
import Navbar from "components/navbar";

import { userLogout } from "src/services/auth";
import Css from "./index.module.scss";
import action from "src/actions";
import { getUserInfo } from "src/services/user";

class Mine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      head: require("src/assets/images/user/my/default-head.png"),
      nickname: "",
      points: "",
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  logout() {
    Modal.alert('','确认退出？',[
      {text:'取消',onPress:()=>{}},
      {text:'确定',onPress:()=>{
        const param = {
          uid: this.props.state.auth.userData.uid,
        };
        userLogout(param).then((res) => {
          if (res.code === 200) {
            this.props.dispatch(action.auth.logout());
            this.props.history.replace("/home/index");
          }
        });
      }}
    ])
  }

  login() {
    this.props.history.push("/auth/login");
  }

  getUserInfo() {
    if (this.props.state.auth && this.props.state.auth.userData) {
      const param = {
        uid: this.props.state.auth.userData.uid,
      };
      getUserInfo(param).then((res) => {
        if (res.code === 200) {
          this.setState({
            head: res.data.head,
            nickname: res.data.nickname,
            points: res.data.points,
          });
        }
      });
    }
  }

  render() {
    return (
      <div>
        <Navbar title="会员中心" />
        <div className={Css["user-info-wrap"]}>
          <div className={Css["head"]}>
            <img src={this.state.head} alt="" />
          </div>
          <div className={Css["nickname"]}>昵称：{this.state.nickname}</div>
          <div className={Css["points"]}>我的积分：{this.state.points}</div>
        </div>
        <div className={Css["order-name-wrap"]}>
          <div className={Css["order-name"]}>全部订单</div>
          <div className={Css["show-order"]}>查看全部订单 &gt;</div>
        </div>
        <div className={Css["order-status-wrap"]}>
          <div className={Css["item"]}>
            <div className={Css["icon"] + " " + Css["wait"]}></div>
            <div className={Css["text"]}>待支付</div>
          </div>
          <div className={Css["item"]}>
            <div className={Css["icon"] + " " + Css["take"]}></div>
            <div className={Css["text"]}>待收货</div>
          </div>
          <div className={Css["item"]}>
            <div className={Css["icon"] + " " + Css["comment"]}></div>
            <div className={Css["text"]}>待评价</div>
          </div>
        </div>
        <div className={Css["menu-list-wrap"]}>
          <ul>
            <li>个人资料</li>
            <li></li>
          </ul>
          <ul>
            <li>地址管理</li>
            <li></li>
          </ul>
          <ul>
            <li>绑定手机</li>
            <li></li>
          </ul>
          <ul>
            <li>修改密码</li>
            <li></li>
          </ul>
          <ul>
            <li>我的收藏</li>
            <li></li>
          </ul>
          {this.props.state.auth && this.props.state.auth.userData ? (
            <div
              className={Css["btn"] + " " + Css["gray"]}
              onClick={() => this.logout()}
            >
              安全退出
            </div>
          ) : (
            <div className={Css["btn"]} onClick={() => this.login()}>
              登录/注册
            </div>
          )}
        </div>
        <TabBar />
      </div>
    );
  }
}

export default connect((state) => {
  return {
    state,
  };
})(Mine);
