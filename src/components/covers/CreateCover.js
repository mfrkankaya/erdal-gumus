import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import * as firebase from 'firebase'
import { slugify, capitalize } from '../../helpers'

export default class CreateCover extends Component {
  state = {
    cover: '',
    pending: false
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ pending: true })
    const { cover } = this.state
    const _cover = slugify(cover)
    const ref = firebase.database().ref(`/covers/${_cover}/`)
    try {
      const res = ref.set({ id: _cover, name: capitalize(cover) })
      this.setState({ cover: '' })
    } catch (err) {
      alert('Kaplama oluşturulurken bir hata oluştu. Bu hata internet bağlantınızdan kaynaklı olabilir.')
    } finally {
      this.setState({ pending: false })
    }
  }

  render() {
    const { cover, pending } = this.state
    return (
      <>
        <h1>Yeni Kaplama Oluştur</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input label="Kaplama" placeholder="Kaplama" required value={cover} onChange={e => this.setState({ cover: e.target.value })} />
          <Form.Button type="submit" loading={pending} disabled={!cover} primary>
            Kaplama Oluştur
          </Form.Button>
        </Form>
      </>
    )
  }
}
