import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import * as firebase from 'firebase'
import { slugify, capitalize } from '../../helpers'

export default class CreateColor extends Component {
  state = {
    color: '',
    pending: false
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ pending: true })
    const { color } = this.state
    const _color = slugify(color)
    const ref = firebase.database().ref(`/colors/${_color}/`)
    try {
      const res = ref.set({ id: _color, name: capitalize(color) })
      this.setState({ color: '' })
    } catch (err) {
      alert('Renk oluşturulurken bir hata oluştu. Bu hata internet bağlantınızdan kaynaklı olabilir.')
    } finally {
      this.setState({ pending: false })
    }
  }

  render() {
    const { color, pending } = this.state
    return (
      <>
        <h1>Yeni Renk Oluştur</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input label="Renk" placeholder="Renk" required value={color} onChange={e => this.setState({ color: e.target.value })} />
          <Form.Button type="submit" loading={pending} disabled={!color} primary>
            Renk Oluştur
          </Form.Button>
        </Form>
      </>
    )
  }
}
