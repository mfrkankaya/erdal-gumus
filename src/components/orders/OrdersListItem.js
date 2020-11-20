import React, { Component } from "react";
import { Table, Button, Header, Icon, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";
import * as firebase from "firebase";

export default class OrdersListItem extends Component {
  state = {
    modalOpen: false,
    dateToShow: ""
  };

  handleRemove = () => {
    firebase
      .database()
      .ref("orders")
      .child(this.props.item.date)
      .remove()
      .then(this.handleClose)
      .catch(() => alert("Silme sırasında bir hata oluştu."));
  };

  handleOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  componentWillMount() {
    const { date } = this.props.item;
    const d = new Date(date);
    const dateToShow = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
    this.setState({ dateToShow });
  }

  render() {
    const { products, date } = this.props.item;
    const { dateToShow } = this.state;
    const _products = Object.values(products);
    return (
      <Table.Row>
        <Table.Cell>
          <Link to={`/app/siparisler/${date}`}>
            <div className="order-list-products flex flex-row wrap align-center">
              {_products.slice(0, 3).map(prod => (
                <div
                  className="flex flex-col mb-1 align-center"
                  style={{ marginRight: ".5rem" }}
                  key={prod.date}
                >
                  <span>{prod.code}</span>
                  <img src={prod.productImage} className="order-list-image" />
                  <span>{prod.totalUnit} &nbsp;Adet</span>
                </div>
              ))}
              <span>+{_products.length - 3} Ürün</span>
            </div>
          </Link>
          {/* <img style={imageStyle} src={patternImage} /> */}
        </Table.Cell>
        <Table.Cell>
          <span style={{ fontWeight: "bolder", color: "#454545" }}>
            {dateToShow}
          </span>
        </Table.Cell>
        <Table.Cell>
          <Modal
            trigger={
              <Button color="red" basic onClick={this.handleOpen}>
                <span className="flex flex-row">
                  <Icon name="trash" />
                  Sil
                </span>
              </Button>
            }
            open={this.state.modalOpen}
            onClose={this.handleClose}
            basic
            size="small"
          >
            <Header
              icon="trash"
              content={`Bu öğeyi silmek istediğine emin misin?`}
            />
            <Modal.Content>
              <p>Sildikten sonra bunu geri alamazsın.</p>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.handleClose} basic color="green" inverted>
                <Icon name="remove" /> Silme
              </Button>
              <Button onClick={this.handleRemove} color="red" inverted>
                <Icon name="trash" /> Sil
              </Button>
            </Modal.Actions>
          </Modal>
        </Table.Cell>
      </Table.Row>
    );
  }
}
