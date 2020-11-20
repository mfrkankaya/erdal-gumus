import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'
import OrdersListItem from './OrdersListItem'

class ListOrders extends Component {
  render() {
    return (
      <>
        <br></br>
        <h1>Tüm Siparişler [{this.props.orders.length} Sipariş]</h1>
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell collapsing>Ürünler</Table.HeaderCell>
              <Table.HeaderCell>Oluşturma Tarihi</Table.HeaderCell>
              <Table.HeaderCell collapsing></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.orders.map((item, index) => (
              <OrdersListItem key={index} index={index} item={item} />
            ))}
          </Table.Body>
        </Table>
        <br></br>
        <br></br>
      </>
    )
  }
}

const mapStateToProps = ({ general: { orders } }) => ({ orders })

export default connect(mapStateToProps)(ListOrders)
