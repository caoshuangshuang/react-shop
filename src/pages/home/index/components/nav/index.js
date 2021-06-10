import React from "react";
import Css from "./index.module.scss";
import {getNav} from 'src/services/home'

import {lazyImg} from 'src/utils/index.js'

class QuickNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aNav: [],
    };
  }

  componentDidMount(){
    this.getNav()
  }

  getNav() {
    getNav().then(
      (res) => {
        if (res.code === 200) {
          this.setState({ aNav: res.data },()=>{
            lazyImg()
          });
        }
      }
    );
  }

  render() {
    return (
      <div className={Css["quick-nav"]}>
      {this.state.aNav && this.state.aNav.length
        ? this.state.aNav.map((item, index) => {
            return (
              <ul className={Css["item"]} key={index}>
                <li className={Css["item-img"]}>
                <img src={require('src/assets/images/common/lazyImg.jpg')} alt={item.title} data-echo={item.image} />
                </li>
                <li className={Css["item-text"]}>{item.title}</li>
              </ul>
            );
          })
        : ""}
    </div>
    );
  }
}
export default QuickNav;
