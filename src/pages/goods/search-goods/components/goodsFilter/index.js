import React from "react";
import Css from "./index.module.scss";
import { getParam } from "src/services/goods";

import { getGoodsClassify } from "src/services/goods";
export default class GoodsFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fPrice1: "",
      fPrice2: "",
      aClassify: {},
      aPrice: {
        fold: false,
        selected: [],
        items: [
          { price1: 1, price2: 50 },
          { price1: 51, price2: 100 },
          { price1: 101, price2: 300 },
          { price1: 301, price2: 1000 },
          { price1: 1001, price2: 4000 },
          { price1: 4001, price2: 10000 },
        ],
      },
      aAttr: [],
    };
    this.filter = React.createRef();
  }

  componentDidMount() {
    this.getClassifyData();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.keywords && prevProps.keywords !== this.props.keywords) {
      this.getAttrData();
    }
  }

  // 获取分类数据
  getClassifyData() {
    getGoodsClassify().then((res) => {
      if (res.code === 200) {
        const aClassify = {
          fold: false,
          selected: [],
          items: res.data,
        };
        this.setState({ aClassify });
      }
    });
  }

  // 获取属性数据
  getAttrData() {
    const param = {
      kwords: this.props.keywords,
    };
    getParam(param).then((res) => {
      if (res.code === 200 && res.data && res.data.length) {
        const aAttr = [];
        for (let item of res.data) {
          aAttr.push({
            title: item.title,
            attrid: item.attrid,
            fold: false,
            selected: [],
            param: item.param,
          });
        }
        this.setState({ aAttr });
      } else {
        this.setState({ aAttr: [] });
      }
    });
  }

  // 分类显示隐藏
  handleClassify = (e) => {
    e.stopPropagation();
    let aClassify = { ...this.state.aClassify };
    aClassify.fold = !aClassify.fold;
    this.setState({ aClassify });
  };

  // 选择分类
  selectClassify(index, e) {
    e.stopPropagation();
    let aClassify = { ...this.state.aClassify };
    aClassify.selected = [index];
    this.setState({ aClassify });
  }

  // 价格显示隐藏
  handlePrice(e) {
    e.stopPropagation();
    let aPrice = { ...this.state.aPrice };
    aPrice.fold = !aPrice.fold;
    this.setState({ aPrice });
  }

  // 选择价格
  selectPrice(index, price1, price2, e) {
    e.stopPropagation();
    let aPrice = { ...this.state.aPrice };
    aPrice.selected = [index];
    this.setState({ aPrice, fPrice1: price1, fPrice2: price2 });
  }

  // 其他显示和隐藏
  handleAttr(index, e) {
    console.log(index);
    e.stopPropagation();
    let aAttr = [...this.state.aAttr];
    aAttr[index].fold = !aAttr[index].fold;
    this.setState({ aAttr });
  }

  // 选择其他
  selectAttr(index, subIndex, e) {
    e.stopPropagation();
    let aAttr = [...this.state.aAttr];
    if (aAttr[index].selected.includes(subIndex)) {
      let i = aAttr[index].selected.findIndex((ele) => ele === subIndex);
      aAttr[index].selected.splice(i, 1);
    } else {
      aAttr[index].selected.push(subIndex);
    }
    this.setState({ aAttr });
  }

  handleScreen() {
    this.filter.current.addEventListener(
      "touchmove",
      function (e) {
        console.log("moveee");
        // e.preventDefault();
      },
      false
    );
  }

  // 隐藏筛选面板
  hideScreen() {
    this.setState({ screenMove: Css["unmove"] });
  }

  // 显示筛选面板
  showScreen() {
    // this.handleScreen();
    this.setState({ screenMove: Css["move"] });
  }

  handleConfirm = (e) => {
    e.stopPropagation();
    const cid = this.state.aClassify.selected.length
      ? this.state.aClassify.items[this.state.aClassify.selected].cid
      : "";
    const price1 = this.state.fPrice1;
    const price2 = this.state.fPrice2;
    const param = [];
    if (this.state.aAttr && this.state.aAttr.length) {
      const sAttr = this.state.aAttr.filter(
        (item) => item.selected && item.selected.length
      );
      if (sAttr && sAttr.length) {
        sAttr.forEach((item) => {
          for (let cur of item.selected) {
            param.push(item.param[cur].pid);
          }
        });
      }
    }
    const params = {
      cid,
      price1,
      price2,
      param,
    };
    this.props.hideFilter();
    this.props.refresh(params);
  };

  handleReset = (e) => {
    e.stopPropagation();
    const fPrice1 = "";
    const fPrice2 = "";
    let aClassify = { ...this.state.aClassify };
    aClassify.selected = [];
    const aPrice = { ...this.state.aPrice };
    aPrice.selected = [];
    const aAttr = this.state.aAttr.map((item) => {
      return {
        ...item,
        selected: [],
      };
    });
    this.setState({
      fPrice1,
      fPrice2,
      aClassify,
      aPrice,
      aAttr,
    });
  };

  render() {
    return (
      <div
        ref="filter"
        className={this.props.show ? Css["mask"] : Css["mask"] + " hide"}
        onClick={() => this.props.hideFilter()}
      >
        <div
          id="screen"
          className={Css["screen"] + " " + this.state.screenMove}
        >
          {/* 分类 */}
          <div className={Css["attr-wrap"]}>
            <div className={Css["attr-title-wrap"]}>
              <div className={Css["attr-name"]}>分类</div>
              <div
                className={
                  this.state.aClassify.fold
                    ? Css["attr-icon"] + " " + Css["up"]
                    : Css["attr-icon"]
                }
                onClick={this.handleClassify}
              />
            </div>
            <div
              className={
                this.state.aClassify.fold
                  ? Css["item-wrap"] + " height-hide"
                  : Css["item-wrap"]
              }
            >
              {this.state.aClassify &&
              this.state.aClassify.items &&
              this.state.aClassify.items.length
                ? this.state.aClassify.items.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={
                          this.state.aClassify.selected.includes(index)
                            ? Css["item"] + " " + Css["active"]
                            : Css["item"]
                        }
                        onClick={(e) => this.selectClassify(index, e)}
                      >
                        {item.title}
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
          <div
            style={{ width: "100%", height: "1px", background: "#efefef" }}
          ></div>
          {/* 价格区间 */}
          <div className={Css["attr-wrap"]}>
            <div className={Css["attr-title-wrap"]}>
              <div className={Css["attr-name"]}>价格区间</div>
              <div className={Css["price-wrap"]}>
                <div
                  className={Css["price-input"]}
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="tel"
                    placeholder="最低价"
                    value={this.state.fPrice1 === 0 ? "" : this.state.fPrice1}
                    onChange={(e) => this.setState({ fPrice1: e.target.value })}
                  />
                </div>
                <div className={Css["price-line"]}></div>
                <div
                  className={Css["price-input"]}
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="tel"
                    placeholder="最高价"
                    value={this.state.fPrice2 === 0 ? "" : this.state.fPrice2}
                    onChange={(e) => this.setState({ fPrice2: e.target.value })}
                  />
                </div>
              </div>
              <div
                className={
                  this.state.aPrice.fold
                    ? Css["attr-icon"] + " " + Css["up"]
                    : Css["attr-icon"]
                }
                onClick={(e) => this.handlePrice(e)}
              />
            </div>
            <div
              className={
                this.state.aPrice.fold
                  ? Css["item-wrap"] + " height-hide"
                  : Css["item-wrap"]
              }
            >
              {this.state.aPrice &&
              this.state.aPrice.items &&
              this.state.aPrice.items.length
                ? this.state.aPrice.items.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={
                          this.state.aPrice.selected.includes(index)
                            ? Css["item"] + " " + Css["active"]
                            : Css["item"]
                        }
                        onClick={(e) =>
                          this.selectPrice(index, item.price1, item.price2, e)
                        }
                      >
                        {item.price1}-{item.price2}
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
          <div
            style={{ width: "100%", height: "1px", background: "#efefef" }}
          />
          {this.state.aAttr && this.state.aAttr.length
            ? this.state.aAttr.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className={Css["attr-wrap"]}>
                      <div className={Css["attr-title-wrap"]}>
                        <div className={Css["attr-name"]}>{item.title}</div>
                        <div
                          className={
                            item.fold
                              ? Css["attr-icon"] + " " + Css["up"]
                              : Css["attr-icon"]
                          }
                          onClick={(e) => this.handleAttr(index, e)}
                        />
                      </div>

                      <div
                        className={
                          item.fold
                            ? Css["item-wrap"] + " height-hide"
                            : Css["item-wrap"]
                        }
                      >
                        {item.param && item.param.length
                          ? item.param.map((subItem, subIndex) => {
                              return (
                                <div
                                  key={subIndex}
                                  className={
                                    item.selected.includes(subIndex)
                                      ? Css["item"] + " " + Css["active"]
                                      : Css["item"]
                                  }
                                  onClick={(e) =>
                                    this.selectAttr(index, subIndex, e)
                                  }
                                >
                                  {subItem.title}
                                </div>
                              );
                            })
                          : ""}
                      </div>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "1px",
                        background: "#efefef",
                      }}
                    />
                  </React.Fragment>
                );
              })
            : ""}
        </div>
        <div className={Css["handle-wrap"]}>
          <div className={Css["item"]}>
            共<span>{this.props.total}</span>件
          </div>
          <div
            className={Css["item"] + " " + Css["reset"]}
            onClick={this.handleReset}
          >
            全部重置
          </div>
          <div
            className={Css["item"] + " " + Css["sure"]}
            onClick={this.handleConfirm}
          >
            确定
          </div>
        </div>
      </div>
    );
  }
}
