/*
 * @Description: 
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2021-03-23 11:12:43
 * @LastEditors: 曹双双
 * @LastEditTime: 2021-03-23 11:24:15
 */
import React from 'react'
import {Redirect,Route} from 'react-router-dom'
const PrivateRoute=({component:Component,...rest})=>(
  <Route
    {...rest}
    render={props=>
      Boolean(localStorage['isLogin'])?(
        <Component {...props} />
      ):(
        <Redirect 
          to={{
            pathname:'/login',
            state:{from:props.location}
        }}
      />
    )}
  />
)
export {
  PrivateRoute
}