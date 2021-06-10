/*
 * @Description: 
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2021-03-24 18:46:09
 * @LastEditors: 曹双双
 * @LastEditTime: 2021-03-24 18:46:59
 */
import React, { Component } from "react";

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component
      });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}