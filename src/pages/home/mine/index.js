import React from "react";
import { connect } from "react-redux";
import action from "src/actions";

import TabBar from "src/layouts/tabBar/Index.js";

import {userLogout} from 'src/services/auth'

class Mine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logout() {
    const param={
      uid:this.props.state.auth.userData.uid
    }
    userLogout(param).then(res=>{
      if(res.code===200){
        this.props.dispatch(action.auth.logout());
        this.props.history.replace('/home/index')
      }
    })
  }

  render() {
    return (
      <div>
        <TabBar />
        昵称：
        {this.props.state &&
          this.props.state.auth &&
          this.props.state.auth.userData&&
          this.props.state.auth.userData.nickname}
        <button onClick={() => this.logout()}>安全登出</button>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    state,
  };
})(Mine);
