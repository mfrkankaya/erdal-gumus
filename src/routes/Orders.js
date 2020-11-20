import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import ListOrders from '../components/orders/ListOrders'

export default class Orders extends Component {
  render() {
    return (
      <Container>
        <ListOrders />
      </Container>
    )
  }
}
