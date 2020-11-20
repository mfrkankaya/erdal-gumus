import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Container, Modal } from "semantic-ui-react";
import * as firebase from "firebase";
import { Redirect } from "react-router-dom";

class PatternPage extends Component {
  state = {
    code: "",
    pieces: "",
    patternImage: null,
    postInProgress: false,
    loading: true,
    newImage: null,
    newImageUploaded: false,
    initialCode: null,
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
    const { _patterns } = props;
    if (!_patterns) return;
    if (!_patterns[id]) return;
    const pattern = _patterns[id];
    const { code, patternImage, pieces } = pattern;

    this.setState({
      patternImage,
      code,
      initialCode: code,
      pieces,
      loading: false
    });
  };

  componentDidUpdate() {
    const { newImageUploaded, postInProgress } = this.state;
    if (newImageUploaded && postInProgress) this.createPattern();
  }

  handleSubmit = e => {
    e.preventDefault();
    const { newImage } = this.state;
    this.setState({ postInProgress: true });
    if (newImage) this.imageUpload(newImage, "newImage");
    else this.setState({ newImageUploaded: true });
    /* ----------------------------------- ** ----------------------------------- */
  };

  createPattern = async () => {
    const { code, pieces, newImage, initialCode, patternImage } = this.state;
    this.setState({ postInProgress: false });
    const ref = firebase.database().ref(`/patterns/${code}`);

    try {
      if (code !== initialCode) {
        const oldPattern = await firebase
          .database()
          .ref(`/patterns/${initialCode}`)
          .remove();
      }

      const pattern = await ref.set({
        code,
        pieces,
        patternImage: newImage ? newImage : patternImage
      });
      this.setState({ redirect: true });
    } catch (err) {
      console.log(err);

      alert(
        "Bir hata oluştu. Bu hata internet bağlantısıyla alakalı olabilir."
      );
    }
  };

  imageUpload = (file, name) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const res = await fetch(reader.result);
        const blob = await res.blob();
        const ref = await firebase
          .storage()
          .ref("patterns")
          .child(`${this.state.code}.jpeg`);

        const snapshot = await ref.put(blob);
        const url = await snapshot.ref.getDownloadURL();
        this.setState({ [name]: url, newImageUploaded: true });
      } catch (err) {
        alert("Fotoğraf yüklenirken bir hata oluştu.");
      }
    };
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  handleImageChange = e =>
    this.setState({ [e.target.name]: e.target.files[0] });

  checkIfCodeExists = () => {
    const { code, initialCode } = this.state;
    const { _patterns } = this.props;
    if (code !== initialCode && _patterns[code])
      return (
        <span style={{ color: "red" }}>
          Bu koda sahip bir kalıp zaten var. Eğer bu kod ile kaydederseniz diğer
          kalıbın üzerine yazılır ve diğer kalıp silinir.
        </span>
      );
    else return null;
  };

  render() {
    console.log(this.props._patterns);
    if (this.state.loading) return <h1>Yükleniyor</h1>;
    const { code, patternImage, pieces, redirect, initialCode } = this.state;
    return (
      <Container>
        {redirect && <Redirect to="/app/mumKaliplari" />}
        <br></br>
        <h1>Kalıp Düzenle [Kod: {initialCode}]</h1>
        <img src={patternImage} style={{ width: "10rem" }} />
        <br></br>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              placeholder="Kod"
              label="Kod"
              value={this.state.code}
              name="code"
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              placeholder="Taş Sayısı"
              label="Taş Sayısı"
              value={this.state.pieces}
              name="pieces"
              onChange={this.handleChange}
              type="number"
              required
            />
            <Form.Input
              placeholder="Kalıp Fotoğrafı"
              label="Kalıp Fotoğrafı"
              name="newImage"
              onChange={this.handleImageChange}
              type="file"
              accept="image/*"
              disabled={this.state.code === ""}
            />
          </Form.Group>
          {this.checkIfCodeExists()}
          <div></div>
          <br></br>
          <Form.Button
            loading={this.state.postInProgress}
            primary
            type="submit"
          >
            Kaydet
          </Form.Button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = ({ general: { patterns, _patterns } }) => ({
  patterns,
  _patterns
});

export default connect(mapStateToProps)(PatternPage);
