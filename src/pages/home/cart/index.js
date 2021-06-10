import React from 'react'

import TabBar from 'src/layouts/tabBar/Index.js'

export default class Mine extends React.Component{
  constructor(props){
    super(props)
    this.state={}
  }

    render() {
      return(
        <div>购物车
          <TabBar />
        </div>
      )
    }
}