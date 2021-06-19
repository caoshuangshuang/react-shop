import React from 'react'

import TabBar from 'src/layouts/tabBar/Index.js'
import Navbar from 'components/navbar'

export default class Mine extends React.Component{
  constructor(props){
    super(props)
    this.state={}
  }

    render() {
      return(
        <div>
          <Navbar title="购物车"/>
          ddd
          <TabBar />
        </div>
      )
    }
}