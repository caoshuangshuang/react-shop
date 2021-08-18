/*
 * @Description:
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2021-03-23 10:53:55
 * @LastEditors: 曹双双
 * @LastEditTime: 2021-08-16 18:58:14
 */
import "babel-polyfill";
import "url-search-params-polyfill";
import "whatwg-fetch";
import React from "react";
import ReactDOM from "react-dom";
import RouterComponent from "./Router";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from './reducers'
import 'lib-flexible'

import "./assets/css/common/public.css";
import "./assets/css/iconfont/index.css"
import './assets/css/common/mixin.scss'

let store = createStore(reducers);
class Index extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Provider store={store}>
          <RouterComponent />
        </Provider>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
