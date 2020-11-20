import React, { Component } from 'react'
import { Button, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { sendOrder, setDefault } from '../../store/actions'
import OrderProduct from './OrderProduct'

class PrepareOrder extends Component {
  state = {
    status: 0
  }

  handleSend = () => this.props.sendOrder(this.props.products)

  render() {
    const _products = Object.values(this.props.products)
    const buttonVisible = _products[0] ? true : false
    return (
      <div className="flex flex-col per-w-100 pb-4">
        {_products.map((product, i) => (
          <OrderProduct key={i} product={product} index={i} />
        ))}
        {this.state.status === 1 && (
          <Message color="green">
            <Message.Header>Sipariş başarıyla oluşturuldu.</Message.Header>
          </Message>
        )}
        {this.state.status === 2 && (
          <Message color="red">
            <Message.Header>Sipariş oluşturulamadı.</Message.Header>
          </Message>
        )}
        {buttonVisible && (
          <Button loading={this.props.pending} disabled={!this.props.sendAvailable} onClick={this.handleSend} primary type="button">
            Sipariş Oluştur
          </Button>
        )}
      </div>
    )
  }
  componentDidUpdate() {
    this.checkIfSent()
  }

  checkIfSent = () => {
    const { sendingFinished, sendStatus } = this.props
    if (sendingFinished) {
      if (sendStatus === 'success') {
        this.props.setDefault()
        this.setState({ status: 1 })
        setTimeout(() => {
          this.setState({ status: 0 })
        }, 2000)
      } else {
        this.setState({ status: 2 })
        setTimeout(() => {
          this.setState({ status: 0 })
        }, 2000)
        alert('Sipariş oluşturulurken bir hata oluştu. Birkaç saniye sonra tekrar deneyin.')
      }
    }
  }

  renderStatus = () => {
    const { status } = this.state
    if (status === 0) return null
    else if (status === 1) return <span>Başarılı</span>
    else return <span>Başarısız</span>
  }
}

const mapStateToProps = ({ order: { products, sendAvailable, pending, sendingFinished, sendStatus } }) => ({
  products,
  sendAvailable,
  pending,
  sendingFinished,
  sendStatus
})

export default connect(
  mapStateToProps,
  { sendOrder, setDefault }
)(PrepareOrder)
