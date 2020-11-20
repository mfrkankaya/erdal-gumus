import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import * as firebase from "firebase";

export default class CreatePattern extends Component {
  state = {
    code: "",
    pieces: "",
    patternImage: null,
    postInProgress: false,
    imageUploaded: false,
    type: false
  };

  componentDidUpdate() {
    const { imageUploaded, postInProgress } = this.state;
    if (imageUploaded && postInProgress) this.createPattern();
  }

  handleSubmit = e => {
    e.preventDefault();
    const { patternImage } = this.state;
    this.setState({ postInProgress: true });
    this.imageUpload(patternImage, "patternImage");
    /* ----------------------------------- ** ----------------------------------- */
  };

  createPattern = async () => {
    const { code, pieces, patternImage, type } = this.state;
    this.setState({ postInProgress: false });
    const ref = firebase.database().ref(`/patterns/${code}`);

    try {
      const pattern = await ref.set({
        code,
        pieces,
        patternImage,
        type
      });
      this.emptyFields();
    } catch (err) {
      alert(
        "Bir hata oluştu. Bu hata internet bağlantısıyla alakalı olabilir."
      );
    }
  };

  // createPattern = async () => {
  //   const { code, pieces, patternImage } = this.state;
  //   if (patternImage) {
  //     this.setState({ postInProgress: false });
  //     const ref = firebase.database().ref(`/patterns/${code}`);
  //     ref
  //       .set({
  //         code,
  //         pieces,
  //         patternImage
  //       })
  //       .then(this.emptyFields)
  //       .catch(err =>
  //         alert(
  //           "Bir hata oluştu. Bu hata internet bağlantısıyla alakalı olabilir."
  //         )
  //       );
  //   } else {
  //     setTimeout(() => {
  //       this.createPattern();
  //     }, 100);
  //   }
  // };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  handleImageChange = e =>
    this.setState({ [e.target.name]: e.target.files[0] });

  emptyFields = () =>
    this.setState({
      code: "",
      pieces: "",
      patternImage: null,
      postInProgress: false,
      imageUploaded: false
    });

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
        this.setState({ [name]: url, imageUploaded: true });
      } catch (err) {
        alert("Fotoğraf yüklenirken bir hata oluştu.");
      }
    };
  };

  render() {
    return (
      <>
        <br></br>
        <h1>Yeni Mum Kalıbı Ekle</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Checkbox
            checked={this.state.type}
            toggle
            onChange={(e, data) => this.setState({ type: data.checked })}
            label="Taşsız Kalıp"
          />
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
              required
              type="number"
            />
            <Form.Input
              placeholder="Kalıp Fotoğrafı"
              label="Kalıp Fotoğrafı"
              name="patternImage"
              onChange={this.handleImageChange}
              required
              type="file"
              accept="image/*"
              disabled={this.state.code === ""}
            />
          </Form.Group>
          <Form.Button
            loading={this.state.postInProgress}
            primary
            type="submit"
          >
            Ekle
          </Form.Button>
        </Form>
      </>
    );
  }
}
