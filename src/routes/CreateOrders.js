import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import CreateOrder from '../components/createOrders/CreateOrder'

export default class Orders extends Component {
  render() {
    return (
      <div>
        <CreateOrder />
      </div>
    )
  }
}
