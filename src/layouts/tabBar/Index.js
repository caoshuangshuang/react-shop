/*
 * @Description:
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2021-03-23 11:08:38
 * @LastEditors: 曹双双
 * @LastEditTime: 2021-05-24 14:24:52
 */
import React from "react";
import {withRouter} from 'react-router-dom'
import Css from "./index.module.scss";
import config from "src/assets/js/conf/config";
import routes from 'src/router/routes.js'

const tabMenu=routes.filter((item)=>item.isTabBar)

 class TabBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab:'',
      tabMenu
    };
  }

  // 根据路由计算当前激活tab
  componentDidMount(){
    this.initState()
  }

  initState(){
    let activeTab=this.props.history.location.pathname.split('/')[1]
    this.setState({
      activeTab
    })
  }

  handleNavClick({path,key}) {
    this.setState({
      activeTab: key,
    });
    this.props.history.replace(config.path + path);
  }
  render() {
    return (
      <div>
        <div className={Css["bottom-nav"]}>
          {
            this.state.tabMenu.map((item,index)=>{
              return(
                <ul key={index} onClick={this.handleNavClick.bind(this, item)}>
                <li
                  class={`${Css[item.icon]} ${
                    this.state.activeTab === item.key ? Css["active"] : ""
                  }`}
                ></li>
                <li
                  class={`${Css["text"]} ${
                    this.state.activeTab === item.key ? Css["active"] : ""
                  }`}
                >
                  {item.name}
                </li>
              </ul>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default withRouter(TabBar)