import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Container, Divider, Button } from "semantic-ui-react";
import * as firebase from "firebase";
import { Redirect } from "react-router-dom";

class ProductPage extends Component {
  state = {
    pending: false,
    patterns: [],
    productImage: null,
    parentCategory: "",
    subCategory: "",
    newImageUploaded: false,
    newImage: null,
    postInProgress: false,
    type: false,
    initialCode: null,
    initialParentCategory: null,
    initialSubCategory: null,
    redirect: false
  };

  componentWillMount() {
    this.initialize(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.initialize(nextProps);
  }

  initialize = props => {
    const { id } = this.props.match.params;
    const {
      _products,
      patterns: { pats },
      categories
    } = props;
    if (!_products && !pats && !categories) return;
    if (!_products[id]) return;

    const product = _products[id];
    const {
      code,
      productImage,
      patterns,
      parentCategory,
      subCategory,
      type
    } = product;

    this.setState({
      productImage,
      code,
      initialCode: code,
      loading: false,
      patterns,
      parentCategory,
      subCategory,
      type,
      initialCode: code,
      initialParentCategory: parentCategory,
      initialSubCategory: subCategory
    });
  };

  componentDidUpdate() {
    const { newImageUploaded, postInProgress } = this.state;
    if (newImageUploaded && postInProgress) this.createProduct();
  }

  handleSubmit = e => {
    e.preventDefault();
    const { newImage, patterns } = this.state;
    if (patterns[0]) {
      this.setState({ postInProgress: true });
      if (newImage) this.imageUpload(newImage, "newImage");
      else this.setState({ newImageUploaded: true });
    } else {
      alert("Ürün için mum kalıpları eklemelisin.");
    }
  };

  createProduct = async () => {
    let {
      patterns,
      productImage,
      parentCategory,
      subCategory,
      type,
      initialSubCategory,
      initialParentCategory,
      initialCode,
      newImage,
      code
    } = this.state;
    const isCodeChanged =
      initialSubCategory !== subCategory ||
      parentCategory !== initialParentCategory;

    if (isCodeChanged) code = this.generateCode();

    if (type == 0) {
      for (let i = 0; i < patterns.length; i++) {
        delete patterns[i].color;
      }
    }

    this.setState({ postInProgress: false });
    const ref = firebase.database().ref(`/products/${code}`);
    try {
      if (code !== initialCode) {
        const oldProduct = await firebase
          .database()
          .ref(`/products/${initialCode}`)
          .remove();
      }
      const pattern = await ref.set({
        code,
        patterns,
        parentCategory,
        subCategory,
        productImage: newImage ? newImage : productImage,
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

      this.setState({ redirect: true });
    } catch (err) {
      alert("Ürün oluşturulurken bir hata oluştu.");
    }
  };

  handleImageChange = e =>
    this.setState({ [e.target.name]: e.target.files[0] });

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
        this.setState({ [name]: url, newImageUploaded: true });
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

  render() {
    if (this.state.loading) return <h1>Yükleniyor</h1>;
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
      <Container>
        {this.state.redirect && <Redirect to="/app/urunler" />}
        <br></br>
        <h1>Ürün Düzenle [Kod: {this.state.initialCode}]</h1>
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
            name="newImage"
            onChange={this.handleImageChange}
            type="file"
            accept="image/*"
            disabled={!parentCategory || !subCategory}
          />
          <Form.Button
            type="submit"
            primary
            loading={this.state.postInProgress}
          >
            Kaydet
          </Form.Button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = ({
  general: {
    categories,
    patterns,
    _patterns,
    subCategories,
    products,
    _products,
    preparedColors,
    lastProductNumber
  }
}) => ({
  categories,
  patterns,
  _patterns,
  subCategories,
  products,
  _products,
  preparedColors,
  lastProductNumber
});

export default connect(mapStateToProps)(ProductPage);

const removeStyle = {
  marginTop: "2.3rem",
  cursor: "pointer",
  position: "absolute",
  right: "-2.3rem",
  color: "red",
  padding: "0 .5rem",
  opacity: 0.8
};
