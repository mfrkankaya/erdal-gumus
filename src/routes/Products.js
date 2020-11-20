import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import CreateProduct from '../components/products/CreateProduct'
import ListProducts from '../components/products/ListProducts'

export default class Products extends Component {
  render() {
    return (
      <Container>
        <CreateProduct />
        <ListProducts />
      </Container>
    )
  }
}
