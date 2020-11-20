import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Divider } from "semantic-ui-react";
import * as firebase from "firebase";

class CreateProduct extends Component {
  state = {
    pending: false,
    patterns: [],
    productImage: null,
    parentCategory: "",
    subCategory: "",
    imageUploaded: false,
    postInProgress: false,
    type: false
  };

  componentDidUpdate() {
    const { imageUploaded, postInProgress } = this.state;
    if (imageUploaded && postInProgress) this.createProduct();
  }

  handleSubmit = e => {
    e.preventDefault();
    const { productImage, patterns } = this.state;
    if (patterns[0]) {
      this.setState({ postInProgress: true });
      this.imageUpload(productImage, "productImage");
    } else {
      alert("Ürün için mum kalıpları eklemelisin.");
    }
  };

  createProduct = async () => {
    const {
      patterns,
      productImage,
      parentCategory,
      subCategory,
      type
    } = this.state;
    const code = this.generateCode();

    this.setState({ postInProgress: false });

    if (type == 0) {
      for (let i = 0; i < patterns.length; i++) {
        delete patterns[i].color;
      }
    }

    const ref = firebase.database().ref(`/products/${code}`);
    try {
      const pattern = await ref.set({
        code,
        patterns,
        parentCategory,
        subCategory,
        productImage,
        type: type ? 1 : 0
      });

      const lastProductNumber = await firebase
        .database()
        .ref("lastProductNumber")
        .once("value");

      const res = await firebase
        .database()
        .ref("lastProductNumber")
        .set(lastProductNumber.val() + 1);

      this.emptyFields();
    } catch (err) {
      alert("Ürün oluşturulurken bir hata oluştu.");
    }
  };

  addOnePattern = () => {
    const { patterns, type } = this.state;
    if (this.props.patterns[0])
      if (type) {
        this.setState({
          patterns: [
            ...patterns,
            { id: this.props.patterns[0].code, pieces: "", color: "" }
          ]
        });
      } else {
        this.setState({
          patterns: [
            ...patterns,
            { id: this.props.patterns[0].code, pieces: "" }
          ]
        });
      }
    else
      alert(
        "Henüz mum kalıplarının verisi yüklenmemiş gibi görünüyor. Birazdan tekrak deneyebilirsin. Bunun için sayfayı yenilemene gerek yoktur."
      );
  };

  handlePatternChange = (e, value, index) => {
    let { patterns } = this.state;
    patterns[index].id = value;
    this.setState({ patterns });
  };

  handlePatternColorChange = (e, value, index) => {
    let { patterns } = this.state;
    patterns[index].color = value;
    this.setState({ patterns });
  };

  handlePaternsUnitChange = (e, index) => {
    let { patterns } = this.state;
    patterns[index].pieces = e.target.value;
    this.setState({ patterns });
  };

  handlePatternRemove = index => {
    const { patterns } = this.state;
    const _patterns = patterns.filter((pattern, i) => index !== i);
    this.setState({ patterns: _patterns });
  };

  handleImageChange = e =>
    this.setState({ [e.target.name]: e.target.files[0] });

  emptyFields = () =>
    this.setState({
      pending: false,
      patterns: [],
      productImage: null,
      imageUploaded: false,
      postInProgress: false,
      type: false,
      subCategory: "",
      parentCategory: ""
    });

  imageUpload = (file, name) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      try {
        const res = await fetch(reader.result);
        const blob = await res.blob();
        const code = this.generateCode();
        const ref = await firebase
          .storage()
          .ref("products")
          .child(`${code}.jpeg`);

        const snapshot = await ref.put(blob);
        const url = await snapshot.ref.getDownloadURL();
        this.setState({ [name]: url, imageUploaded: true });
      } catch (err) {
        alert("Fotoğraf yüklenirken bir hata oluştu.");
      }
    };
  };

  generateCode = () => {
    const { lastProductNumber } = this.props;
    const { parentCategory, subCategory } = this.state;
    const codeStarting = (parentCategory[0] + subCategory[0]).toUpperCase();
    const codeNumber =
      "000".substring(0, 3 - lastProductNumber.toString().length) +
      lastProductNumber.toString();
    return codeStarting + codeNumber;
  };

  render() {
    const { parentCategory, subCategory, type } = this.state;
    const { preparedColors } = this.props;
    const preparedParentCategories = this.props.categories.map(cat => ({
      text: cat.name,
      value: cat.id,
      key: cat.id
    }));
    const preparedSubCategories = this.props.subCategories
      .filter(cat => cat.parentCategory === parentCategory)
      .map(cat => ({ text: cat.name, value: cat.id, key: cat.id }));
    const preparedPatterns = this.props.patterns.map(pat => ({
      text: pat.code,
      key: pat.code,
      value: pat.code
    }));

    return (
      <>
        <br></br>
        <h1>Yeni Ürün Oluştur</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Checkbox
            checked={this.state.type}
            toggle
            onChange={(e, data) => this.setState({ type: data.checked })}
            label="Renkli Ürün"
          />
          <Form.Group widths="equal">
            <Form.Select
              required
              placeholder="Ana Kategori"
              label="Ana Kategori"
              options={preparedParentCategories}
              onChange={(e, { value }) =>
                this.setState({ parentCategory: value, subCategory: "" })
              }
              value={this.state.parentCategory}
            />
            <Form.Select
              required
              placeholder="Alt Kategori"
              label="Alt Kategori"
              options={this.state.parentCategory ? preparedSubCategories : []}
              onChange={(e, { value }) => this.setState({ subCategory: value })}
              value={this.state.subCategory}
              disabled={!this.state.parentCategory}
            />
          </Form.Group>
          {this.state.patterns.map((pattern, index) => (
            <Form.Group widths="equal" key={index}>
              <Form.Select
                onChange={(e, { value }) =>
                  this.handlePatternChange(e, value, index)
                }
                fluid
                label={`${index + 1}. Mum Kalıbı`}
                options={preparedPatterns}
                placeholder={`${index + 1}. Mum Kalıbı`}
                required
                value={this.state.patterns[index].id}
              />
              <Form.Input
                type="number"
                placeholder={`${index + 1}. Taş Adeti`}
                label={`${index + 1}. Taş Adeti`}
                value={this.state.patterns[index].pieces}
                onChange={e => this.handlePaternsUnitChange(e, index)}
                required
              />
              {type && (
                <Form.Select
                  onChange={(e, { value }) =>
                    this.handlePatternColorChange(e, value, index)
                  }
                  fluid
                  label={`${index + 1}. Mum Kalıbı Rengi`}
                  options={preparedColors}
                  placeholder={`${index + 1}. Mum Kalıbı Rengi`}
                  required
                  value={this.state.patterns[index].color}
                />
              )}
              <span
                style={removeStyle}
                onClick={() => this.handlePatternRemove(index)}
              >
                Sil
              </span>
            </Form.Group>
          ))}
          <Button type="button" onClick={this.addOnePattern} secondary>
            Mum Kalıbı Ekle
          </Button>
          <Divider />
          <Form.Input
            placeholder="Ürün Fotoğrafı"
            label="Ürün Fotoğrafı"
            name="productImage"
            onChange={this.handleImageChange}
            required
            type="file"
            accept="image/*"
            disabled={!parentCategory || !subCategory}
          />
          <Form.Button
            type="submit"
            primary
            loading={this.state.postInProgress}
          >
            Ürün Oluştur
          </Form.Button>
        </Form>
        <Divider />
      </>
    );
  }
}

const mapStateToProps = ({
  general: {
    categories,
    patterns,
    subCategories,
    products,
    preparedColors,
    lastProductNumber
  }
}) => ({
  categories,
  patterns,
  subCategories,
  products,
  preparedColors,
  lastProductNumber
});

export default connect(mapStateToProps, {})(CreateProduct);

const removeStyle = {
  marginTop: "2.3rem",
  cursor: "pointer",
  position: "absolute",
  right: "-2.3rem",
  color: "red",
  padding: "0 .5rem",
  opacity: 0.8
};
