import React from "react";
import Css from "./index.module.scss";
import {getRecom} from 'src/services/home'
import {lazyImg} from 'utils/index'

class Recommend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aRecoGoods:[]
    };
  }

  componentDidMount(){
    this.getRecom()
  }

  getRecom() {
    getRecom().then((res) => {
      if (res.code === 200) {
        this.setState({ aRecoGoods: res.data },()=>{
          lazyImg()
        });
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className={Css["reco-title-wrap"]}>
          <div className={Css["line"]}></div>
          <div className={Css["reco-text-wrap"]}>
            <div className={Css["reco-icon"]}></div>
            <div className={Css["reco-text"]}>为您推荐</div>
          </div>
          <div className={Css["line"]}></div>
        </div>
        <div className={Css["reco-item-wrap"]}>
          {this.state.aRecoGoods.map((item, index) => {
            return (
              <div key={index} className={Css["reco-item"]} onClick={()=>this.props.goPage('goods/detail?gid='+item.gid)}>
                <div className={Css["image"]}>
                  <img src={require('src/assets/images/common/lazyImg.jpg')} alt={item.title} data-echo={item.image}/>
                </div>
                <div className={Css["title"]}>{item.title}</div>
                <div className={Css["price"]}>￥{item.price}</div>
              </div>
            );
          })}
        </div> 
      </React.Fragment>
    );
  }
}
export default Recommend;
