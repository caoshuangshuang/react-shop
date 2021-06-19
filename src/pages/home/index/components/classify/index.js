import React from "react";
import Css from "./index.module.scss";
import { getGoodsLevel } from "src/services/home";
import { lazyImg } from "utils/index";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aGoods: [],
    };
  }

  componentDidMount() {
    this.getGoodsLevel();
  }

  getGoodsLevel() {
    getGoodsLevel().then((res) => {
      if (res.code === 200) {
        this.setState({ aGoods: res.data }, () => {
          lazyImg();
        });
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.aGoods && this.state.aGoods.length
          ? this.state.aGoods.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <div className={Css["goods-level-wrap"]}>
                    <div
                      className={
                        Css["classify-title"] + " " + Css["color" + (index + 1)]
                      }
                    >
                      —— {item.title} ——
                    </div>
                    {index % 2 === 1 ? (
                      <div className={Css["goods-level1-wrap"]}>
                        {item.items && item.items.length
                          ? item.items.slice(0, 2).map((curItem, index) => {
                              return (
                                <div
                                  key={index}
                                  className={Css["goods-level1-item0"]}
                                  onClick={()=>this.props.goPage('goods/detail?gid='+curItem.gid)}
                                >
                                  <div className={Css["goods-title2"]}>
                                    {curItem.title}
                                  </div>
                                  <div className={Css["goods-text2"]}>
                                    精品打折
                                  </div>
                                  <div className={Css["goods-img2"]}>
                                    <img
                                      src={require("src/assets/images/common/lazyImg.jpg")}
                                      alt={curItem.title}
                                      data-echo={curItem.image}
                                    />
                                  </div>
                                </div>
                              );
                            })
                          : ""}
                      </div>
                    ) : (
                      <div className={Css["goods-level1-wrap"]}>
                        <div className={Css["goods-level1-item0"]}  onClick={()=>this.props.goPage('goods/detail?gid='+item.items[0].gid)}>
                          <div className={Css["goods-title"]}>
                            {item.items && item.items.length
                              ? item.items[0].title
                              : ""}
                          </div>
                          <div className={Css["goods-text"]}>精品打折</div>
                          <div className={Css["goods-price" + (index + 1)]}>
                            {item.items && item.items.length
                              ? item.items[0].price
                              : ""}
                            元
                          </div>
                          <div className={Css["goods-img"]}>
                            <img
                              src={require("src/assets/images/common/lazyImg.jpg")}
                              data-echo={
                                item.items && item.items.length
                                  ? item.items[0].image
                                  : ""
                              }
                              alt={
                                item.items && item.items.length
                                  ? item.items[0].title
                                  : ""
                              }
                            />
                          </div>
                        </div>
                        <div className={Css["goods-level1-item1"]} >
                          {item.items && item.items.length
                            ? item.items.slice(1, 3).map((curItem, index) => (
                                <div className={Css["goods-row"]} key={index} onClick={()=>this.props.goPage('goods/detail?gid='+curItem.gid)}>
                                  <div className={Css["goods-row-title"]}>
                                    {curItem.title}
                                  </div>
                                  <div className={Css["goods-row-text"]}>
                                    品质精挑
                                  </div>
                                  <div className={Css["goods-row-img"]}>
                                    <img
                                      src={require("src/assets/images/common/lazyImg.jpg")}
                                      alt={curItem.title}
                                      data-echo={curItem.image}
                                    />
                                  </div>
                                </div>
                              ))
                            : ""}
                        </div>
                      </div>
                    )}

                    <div className={Css["goods-list-wrap"]}>
                      {item.items && item.items.length
                        ? item.items
                            .slice(index % 2 === 1 ? 2 : 3)
                            .map((curItem, index) => {
                              return (
                                <div className={Css["goods-list"]} key={index} onClick={()=>this.props.goPage('goods/detail?gid='+curItem.gid)}>
                                  <div className={Css["title"]}>
                                    {curItem.title}
                                  </div>
                                  <div className={Css["image"]}>
                                    <img
                                      src={require("src/assets/images/common/lazyImg.jpg")}
                                      alt={curItem.title}
                                      data-echo={curItem.image}
                                    />
                                  </div>
                                  <div className={Css["price"]}>
                                    ￥{curItem.price}
                                  </div>
                                  <div className={Css["unprice"]}>
                                    ￥{curItem.price * 2}
                                  </div>
                                </div>
                              );
                            })
                        : ""}
                    </div>
                  </div>
                </React.Fragment>
              );
            })
          : ""}
      </React.Fragment>
    );
  }
}
export default SearchBar;
