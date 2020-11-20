import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { addEditItemCover } from '../../store/actions'
import ColorfulCoverEdit from './ColorfulCoverEdit'
import Dropdown from '../Dropdown'

class ColorfulProductEditItem extends Component {
  render() {
    const { preparedColors, preparedCovers, productCode, index, orderProducts, removeProductEditItem, productCovers, type } = this.props
    console.log(productCovers);
    
    return (
      <div className="product-edit-item per-h-100 p-1 flex flex-col relative">
        <h5 style={{ lineHeight: '1rem', marginTop: '1rem' }}>Kaplamalar &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Adetler</h5>
        <div style={{ overflowY: 'scroll', height: '60%' }}>
          {productCovers.map((cover, i) => (
            <ColorfulCoverEdit cover={cover} key={i} index={i} productCode={productCode} type={type} />
          ))}
        </div>
        <Form.Button
          primary
          fluid
          basic
          onClick={() => this.props.addEditItemCover({ productCode, parentIndex: null, type })}
          type="button"
        >
          + Kaplama Ekle
        </Form.Button>
      </div>
    )
  }
}

const mapStateToProps = ({ general: { colors, covers, preparedCovers, preparedColors }, order: { products } }) => ({
  colors,
  covers,
  preparedCovers,
  preparedColors,
  orderProducts: products
})

export default connect(
  mapStateToProps,
  { addEditItemCover }
)(ColorfulProductEditItem)
