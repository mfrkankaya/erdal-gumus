import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { editItemCoverChanged, editItemCoverUnitChanged, removeEditItemCover } from '../../store/actions'
import Dropdown from '../Dropdown'
import MyInput from '../Input'

class CoverEdit extends Component {
  render() {
    const { cover, productCode, parentIndex, index, orderProducts } = this.props
    return (
      <div className="flex flex-row relative">
        <Dropdown
          placeholder="Kaplama"
          value={orderProducts[productCode].colors[parentIndex].covers[index].cover}
          options={this.props.preparedCovers}
          onChange={e => this.props.editItemCoverChanged({ productCode, parentIndex, index, value: e.target.value })}
        />
        <MyInput
          type="1"
          onChange={e => this.props.editItemCoverUnitChanged({ productCode, parentIndex, index, value: e.target.value })}
          placeholder="Adet"
          value={orderProducts[productCode].colors[parentIndex].covers[index].unit}
          label="asd"
        />
        <div onClick={() => this.props.removeEditItemCover({ index, productCode, parentIndex })} className="remove-cover">
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
