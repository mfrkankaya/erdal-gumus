import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { addProductEditItem, removeProductFromOrer } from '../../store/actions'
import ProductEditItem from './ProductEditITem'
import ColorfulProductEditItem from './ColorfulProductEditItem'

class OrderProduct extends Component {
  render() {
    const { code, productImage, colors, totalUnit, type, covers } = this.props.product

    return (
      <div className="order-product flex flex-row per-w-100 mb-1 wrap align-center relative">
        <div className="order-product-info" style={{ marginBottom: 0 }}>
          <img src={productImage} />
          <span>Ürün Kodu: &nbsp; {code}</span>
          <span>Toplam adet: &nbsp; {totalUnit}</span>
        </div>
        <div className="order-remove">
          <Button onClick={() => this.props.removeProductFromOrer(code)} color="red" basic type="button">
            Sil
          </Button>
        </div>
        {type ? (
          <ColorfulProductEditItem productCovers={covers} productCode={code} type={type} />
        ) : (
          <>
            {colors.map((c, i) => (
              <ProductEditItem key={i} item={c} index={i} productCode={code} />
            ))}
          </>
        )}
        {!type && (
          <div onClick={() => this.props.addProductEditItem(code)} className="plus-button flex w-10 mt-1 justify-center align-center">
            +
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ order: { products } }) => ({ orderProducts: products })

export default connect(
  mapStateToProps,
  { addProductEditItem, removeProductFromOrer }
)(OrderProduct)
