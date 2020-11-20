import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { editItemColorChanged, addEditItemCover, removeProductEditItem } from '../../store/actions'
import CoverEdit from './CoverEdit'
import Dropdown from '../Dropdown'

class ProductEditITem extends Component {
  render() {
    const {
      preparedColors,
      preparedCovers,
      productCode,
      index,
      orderProducts,
      item: { covers },
      removeProductEditItem
    } = this.props

    return (
      <div className="product-edit-item p-1 flex flex-col relative">
        <span onClick={() => removeProductEditItem({ productCode, index })} className="remove-product-edit">
          Sil
        </span>
        <h5 style={{ lineHeight: '1rem', marginTop: 0 }}>Renk</h5>
        <Dropdown
          options={preparedColors}
          label="Renk"
          placeholder="Renk"
          value={orderProducts[productCode].colors[index].color}
          onChange={e => this.props.editItemColorChanged({ productCode, index, value: e.target.value })}
        />
        <h5 style={{ lineHeight: '1rem', marginTop: '1rem' }}>Kaplamalar &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Adetler</h5>
        <div style={{ overflowY: 'scroll', minHeight: '7rem' }}>
          {covers.map((cover, i) => (
            <CoverEdit cover={cover} key={i} index={i} parentIndex={index} productCode={productCode} />
          ))}
        </div>
        <Form.Button primary fluid basic onClick={() => this.props.addEditItemCover({ productCode, parentIndex: index })} type="button">
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
  { editItemColorChanged, addEditItemCover, removeProductEditItem }
)(ProductEditITem)
