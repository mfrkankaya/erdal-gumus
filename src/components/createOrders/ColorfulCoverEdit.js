import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { editItemCoverChanged, editItemCoverUnitChanged, removeEditItemCover } from '../../store/actions'
import Dropdown from '../Dropdown'
import MyInput from '../Input'

class CoverEdit extends Component {
  render() {
    const { cover, productCode, index, orderProducts, type } = this.props
    return (
      <div className="flex flex-row relative">
        <Dropdown
          placeholder="Kaplama"
          value={orderProducts[productCode].covers[index].cover}
          options={this.props.preparedCovers}
          onChange={e => this.props.editItemCoverChanged({ productCode, index, value: e.target.value, type })}
        />
        <MyInput
          type="1"
          onChange={e => this.props.editItemCoverUnitChanged({ productCode, index, value: e.target.value, type })}
          placeholder="Adet"
          value={orderProducts[productCode].covers[index].unit}
          label="asd"
        />
        <div onClick={() => this.props.removeEditItemCover({ index, productCode, type })} className="remove-cover">
          x
        </div>
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
  { editItemCoverChanged, editItemCoverUnitChanged, removeEditItemCover }
)(CoverEdit)
