import React from "react";
import { withRouter } from "react-router-dom";
import Css from "./index.module.scss";

import { NavBar, Icon } from "antd-mobile";
function Navbar(props) {
  function goBack() {
    props.history.goBack();
  }
  return (
    <>
    <div className={Css["nav-bar-wrap"]}>
      <NavBar
        mode="light"
        leftContent={props.hasLeft?<Icon type="left" className={Css["left-icon"]} />:''}
        onLeftClick={goBack}
        rightContent={props.rightCtn}
      >
        {props.title}
      </NavBar>
    </div>
    <div className={Css['height-fill']}></div>
    </>
    
  );
}

export default withRouter(Navbar);
