import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addProductToOrder, removeProductFromOrer } from '../../store/actions'

class SortedProduct extends Component {
  handleAdd = () => {
    const { product, addProductToOrder, removeProductFromOrer, products } = this.props
    if (!products[product.code]) {
      addProductToOrder(product)
    } else {
      removeProductFromOrer(product.code)
    }
  }

  render() {
    const {
      product: { productImage, code },
      products
    } = this.props
    const added = products[code] ? true : false
    
    return (
      <div onClick={this.handleAdd} className={`sorted-product${added ? ' added-style' : ''}`}>
        <img src={productImage} />
        <span>{code}</span>
      </div>
    )
  }
}

const mapStateToProps = ({ order: { products } }) => ({ products })

export default connect(
  mapStateToProps,
  { addProductToOrder, removeProductFromOrer }
)(SortedProduct)
