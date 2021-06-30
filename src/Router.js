/*
 * @Description: 
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2021-03-23 10:54:16
 * @LastEditors: 曹双双
 * @LastEditTime: 2021-06-29 10:51:46
 */
import React from 'react'
import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
// import {PrivateRoute} from './router/private'
import config from './assets/js/conf/config'
import routes from 'src/router/routes.js'

export default class RouterComponent extends React.Component{
  constructor(props){
    super(props)
    this.state={
      routes
    }
  }
  render(){
    return (
      <React.Fragment>
        <Router>
          <React.Fragment>
            <Switch>
              {
                this.state.routes.map((item,index)=>
                <Route key={index} path={config.path+item.path} component={item.component}></Route>
                )
              }
              <Redirect to={config.path+'home/index'}></Redirect>
            </Switch>
          </React.Fragment>
        </Router>
      </React.Fragment>
    )
  }
}
