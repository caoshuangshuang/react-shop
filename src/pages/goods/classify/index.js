import React from "react";
import config from "src/assets/js/conf/config.js";
import Css from "./index.module.scss";
import BScroll from "better-scroll";
import { getGoodsClassify,getClassifyGoods } from "src/services/goods";
import GoodsItems from './components/item.js';
import {localParam} from 'utils/index'
export default class GoodsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curCid: '',
      aClassify: [],
      aGoods:[],
    };
    this.bScroll = null;
  }

  componentDidMount() {
    this.getClassifyData();
  }

  initBScoll() {
    const scrollLeft = document.querySelector("#scroll-left");
    this.bScroll = new BScroll(scrollLeft, {
      scrollX: false,
      scrollY: true,
      click: true,
    });
  }

  initCid(){
    let cid=this.props.location.search?localParam(this.props.location.search).search.cid:''
    if(!cid&&this.state.aClassify&&this.state.aClassify.length){
      cid=this.state.aClassify[0].cid
    }
    this.setState({curCid:cid},()=>{
      this.getGoodsData()
      setTimeout(()=>{
        this.replacePage( "goods/classify/items?cid=" + this.state.curCid,)
      })
    })
  }

  initRef(length) {
    for (let i = 0; i < length; i++) {
      this["classify-item-" + i] = React.createRef();
    }
  }

  getClassifyData() {
    getGoodsClassify().then((res) => {
      if (res.code === 200) {
        this.initRef(res.data.length || 0);
        this.setState(
          {
            aClassify: res.data,
          },
          () => {
            this.initBScoll();
            this.initCid()
          }
        );
      }
    });
  }

  getGoodsData() {
    const param={
      cid:this.state.curCid
    }
    getClassifyGoods(param).then((res) => {
      if (res.code === 200) {
        this.setState({
          aGoods: res.data,
        });
      }else{
        this.setState({
          aGoods:[]
        })
      }
    });
  }

  handleClassifyClick(pUrl, cid,index) {
    this.setState({ curCid: cid },()=>{
      this.getGoodsData()
    });
    this.handleScroll(index);
    this.replacePage(pUrl);
  }

  handleScroll(index) {
    const wrapEle = document.getElementById("scroll-left");
    const curEle = this["classify-item-" + index].current;
    const wrapHeight = wrapEle.offsetHeight;
    this.bScroll.scrollToElement(curEle, 500, 0, -wrapHeight / 3);
  }

  replacePage(pUrl) {
    this.props.history.replace(config.path + pUrl);
  }

  goPage(url){
    this.props.history.push(config.path +url)
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div>
        <div className={Css["search-header"]}>
          <div className={Css["back"]} onClick={()=>this.goBack()} />
          <div className={Css["search"]} onClick={()=>this.goPage('goods/search-keywords')}>请输入宝贝名称</div>
        </div>
        <div className={Css["goods-main"]}>
          <div id="scroll-left" className={Css["classify-wrap"]}>
            <div>
              {this.state.aClassify && this.state.aClassify.length
                ? this.state.aClassify.map((item, index) => {
                    return (
                      <div
                        ref={this["classify-item-" + index]}
                        key={index}
                        className={
                          this.state.curCid === item.cid
                            ? Css["classify-item"] + " " + Css["active"]
                            : Css["classify-item"]
                        }
                        onClick={this.handleClassifyClick.bind(
                          this,
                          "goods/classify/items?cid=" + item.cid,
                          item.cid,
                          index
                        )}
                      >
                        {item.title}
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
          <div className={Css["goods-content"]}>
            <GoodsItems list={this.state.aGoods}/>
          </div>
        </div>
      </div>
    );
  }
}
