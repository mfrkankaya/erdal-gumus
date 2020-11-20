import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as firebase from 'firebase'

class ImageSize extends Component {
  state = {
    value: 10
  }

  componentWillMount() {
    this.setState({ value: this.props.imageSize })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.imageSize })
  }

  handleSubmit = e => {
    e.preventDefault()
    firebase
      .database()
      .ref('imageSize')
      .set(parseInt(this.state.value))
      .then(() => alert('Fotoğraf boyutu başarıyla değiştirildi.'))
      .catch(() => alert('Boyut değiştirilirken bir hata oluştu. Bu internetle alakalı olabilir. Birkaç saniye sonra tekrar deneyin.'))
  }
  render() {
    console.log(this.state.value)

    return (
      <>
        <br></br>
        <h1>Fotoğraf Boyutu</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label="Boyut"
            placeholder="Boyut"
            required
            type="number"
            value={this.state.value}
            onChange={e => this.setState({ value: e.target.value })}
          />
          <Form.Button type="submit" primary disabled={!this.state.value}>
            Fotoğraf Boyutunu Kaydet
          </Form.Button>
        </Form>
        <img className="mt-1" src="https://picsum.photos/id/229/400/400" style={{ width: `${parseInt(this.state.value)}rem` }} />
      </>
    )
  }
}

const mapStateToProps = ({ general: { imageSize } }) => ({ imageSize })

export default connect(mapStateToProps)(ImageSize)
