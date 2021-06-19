import React from "react";
import Css from "./item.module.scss";
import LazyLoad from "react-lazyload";
export default class ItemComponent extends React.Component {
  constructor(props) {
    super(props);
    this.bScroll = null;
  }

  render() {
    return (
      <div id="goods-right" className={Css["goods-content-main"]}>
          {this.props.list && this.props.list.length ? (
            this.props.list.map((item, index) => {
              return (
                <div  id="scroll-panel" className={Css["goods-wrap"]} key={index}>
                  <div className={Css["classify-name"]}>{item.title}</div>
                  <div className={Css["goods-items-wrap"]}>
                    {item.goods && item.goods.length
                      ? item.goods.map((subItem, subIndex) => {
                          return (
                            <ul key={subIndex} onClick={()=>{this.props.goPage('goods/detail?gid='+subItem.gid)}}>
                              <li>
                                <LazyLoad
                                  height={100}
                                  offset={100}
                                  scrollContainer="#scroll-panel"
                                  scroll={true}
                                  overflow={true}
                                  once={true}
                                  placeholder={
                                    <img
                                      src={require("src/assets/images/common/lazyImg.jpg")}
                                      height='100%'
                                      alt=""
                                    />
                                  }
                                >
                                  <img
                                    src={subItem.image}
                                    alt={subItem.title}
                                  />
                                </LazyLoad>
                              </li>
                              <li>{subItem.title}</li>
                            </ul>
                          );
                        })
                      : ""}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="null-item">没有相关数据</div>
          )}
      </div>
    );
  }
}
