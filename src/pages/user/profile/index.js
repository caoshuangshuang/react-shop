import React from "react";
import { connect } from "react-redux";

import Navbar from "components/navbar";
import { ActionSheet, Toast } from "antd-mobile";

import Css from "./index.module.scss";
import { getUserInfo,uploadHead ,editUserInfo} from "src/services/user";

const GENDER_OPTIONS=[{
  value:1,
  label:'男'
},{
  value:2,
  label:'女'
}]

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      head: require("src/assets/images/user/my/default-head.png"),
      nickname: "",
      genderIndex: '',
      headName:'',
      GENDER_OPTIONS
    };
    this.headRef=React.createRef()
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    if (this.props.state.auth && this.props.state.auth.userData) {
      const param = {
        uid: this.props.state.auth.userData.uid,
      };
      getUserInfo(param).then((res) => {
        if (res.code === 200) {
          this.setState({
            head: res.data.head,
            nickname: res.data.nickname,
            genderIndex: +res.data.gender-1,
          });
        }
      });
    }
  }

  selectGender(){
    const BUTTONS = ['男', '女', '取消'];
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      // title: 'title',
      message: '选择性别',
      maskClosable: true,
      'data-seed': 'logId',
      onTouchStart:e=>e.preventDefault(),
    },
    (buttonIndex) => {
      if(buttonIndex!==BUTTONS.length-1){
        this.setState({ genderIndex: buttonIndex });
      }
    });
  }

  submitSave(){
    console.log(123)
    if(this.validForm()){
      const param={
        uid:this.props.state.auth.userData.uid,
        nickname:this.state.nickname,
        gender:this.state.GENDER_OPTIONS[this.state.genderIndex].value,
        head:this.state.headName
      }
      editUserInfo(param).then(res=>{
        if(res.code===200){
          Toast.info('修改成功',2,()=>{
            this.props.history.goBack()
          })
        }
      })
    }
  }

  validForm(){
    if(!this.state.nickname){
      Toast.info('请输入昵称',2)
      return false
    }
    if(!this.state.genderIndex){
      Toast.info('请选择性别')
    }
    if(!this.state.headName){
      Toast.info('请上传头像')
    }
    return true
  }

  uploadHead(){
    const param={
      headfile:this.headRef.current.files[0]
    }
    uploadHead(param).then(res=>{
      if(res.code===200){
        this.setState({head:"http://vueshop.glbuys.com/userfiles/head/"+res.data.msbox,headName:res.data.msbox})
      }
    })
  }

  render() {
    return (
      <div className={Css["page"]}>
        <Navbar
          hasLeft={true}
          title="个人资料"
          rightCtn={<span className={Css["save-btn"]} onClick={()=>this.submitSave()}>保存</span>}
        />
        <div className={Css["main"]}>
          <ul className={Css["head"]}>
            <li>头像</li>
            <li>
              <img src={this.state.head} alt="" />
              <input ref={this.headRef} type="file" onChange={()=>this.uploadHead()}/>
            </li>
          </ul>
          <ul className={Css["list"]}>
            <li>昵称</li>
            <li>
              <input type="text" placeholder="请设置昵称" value={this.state.nickname} onChange={e=>{this.setState({nickname:e.target.value})}}/>
              <div className={Css["arrow"]}></div>
            </li>
          </ul>
          <ul className={Css["list"]}>
            <li>性别</li>
            <li>
              <input type="text" placeholder="请选择性别" readOnly onClick={()=>this.selectGender()} value={this.state.genderIndex!==''?this.state.GENDER_OPTIONS[this.state.genderIndex].label:''}/>
              <div className={Css["arrow"]}></div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    state,
  };
})(Profile);
