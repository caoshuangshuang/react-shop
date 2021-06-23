import React from 'react'
import config from 'src/config/config'

export default class Login extends React.Component{
  componentDidMount(){
    this.goPage('auth/regist')
  }

  goPage(url){
    this.props.history.push(config.path+url)
  }
  render(){
    return(
      <div>会员登录</div>
    )
  }
}