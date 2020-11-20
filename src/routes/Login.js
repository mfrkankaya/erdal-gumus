import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import * as firebase from 'firebase'
import { Redirect } from 'react-router-dom'

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    loading: false
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = e => {
    e.preventDefault()
    const { email, password } = this.state
    if (!this.state.loading) {
      this.setState({ loading: true })
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => this.setState({ loading: false }))
        .catch(() => this.setState({ loading: false }, () => alert('Giriş yaparken bir hata oluştu.')))
    }
  }

  userId = () => {
    if (firebase.auth().currentUser) return <Redirect to="/anasayfa" />
    else return
  }

  render() {
    return (
      <div className="full-page flex flex-col justify-center align-center">
        {this.userId()}
        <h3>Erdal Gümüş</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            required
            placeholder="E-posta"
            label="E-posta"
            onChange={this.handleChange}
            value={this.state.email}
            name="email"
            type="email"
          />
          <Form.Input
            required
            placeholder="Parola"
            label="Parola"
            onChange={this.handleChange}
            value={this.state.password}
            name="password"
            type="password"
          />
          <Form.Button loading={this.state.loading} disabled={this.state.loading} type="submit" fluid primary>
            Giriş
          </Form.Button>
        </Form>
      </div>
    )
  }
}
