import React, { Component } from "react";
import { Table, Button, Header, Icon, Modal } from "semantic-ui-react";
import * as firebase from "firebase";
import { Link } from "react-router-dom";

const imageStyle = {
  height: "10rem",
  borderRadius: ".25rem",
  border: "1px solid #ddd"
};

export default class ProductListItem extends Component {
  state = {
    modalOpen: false
  };

  handleRemove = () => {
    firebase
      .database()
      .ref("products")
      .child(this.props.item.code)
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

  render() {
    const { code, productImage } = this.props.item;
    return (
      <Table.Row>
        <Table.Cell>
          <img style={imageStyle} src={productImage} />
        </Table.Cell>
        <Table.Cell>
          <span style={{ fontWeight: "bolder", color: "#454545" }}>{code}</span>
        </Table.Cell>
        <Table.Cell collapsing>
          <Link to={`/app/urunler/${code}`}>Düzenle</Link>
          <div></div>
          <br></br>
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
