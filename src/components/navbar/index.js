import React from "react";
import { withRouter } from "react-router-dom";
import Css from "./index.module.scss";

import { NavBar, Icon } from "antd-mobile";
function Navbar(props) {
  function goBack() {
    props.history.goBack();
  }
  return (
    <NavBar
      mode="light"
      icon={<Icon type="left" className={Css["left-icon"]} />}
      onLeftClick={goBack}
      rightContent={props.rightCtn}
    >
      {props.title}
    </NavBar>
  );
}

export default withRouter(Navbar);
