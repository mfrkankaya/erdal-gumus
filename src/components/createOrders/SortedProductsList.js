import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import SortedProduct from './SortedProduct'

export default class SortedProductsList extends Component {
  state = {
    show: true
  }

  toggle = () => this.setState({ show: !this.state.show })

  render() {
    const { show } = this.state
    return (
      <>
        <br></br>
        <div>
          <Button onClick={this.toggle} color="teal" type="button">
            {show ? 'Ürünleri Gizle' : 'Ürünleri Göster'}
          </Button>
        </div>
        <div className="flex flex-row wrap space-between mt-1 pb-5" style={{ width: '100%' }}>
          {show && (
            <>
              {this.props.data.map(product => (
                <SortedProduct key={product.code} product={product} />
              ))}
            </>
          )}
        </div>
      </>
    )
  }
}
