import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import * as firebase from 'firebase'
import { slugify, capitalize } from '../../helpers'

export default class CreateCategory extends Component {
  state = {
    category: '',
    pending: false
  }

  handleSubmit = async e => {
    e.preventDefault()
    this.setState({ pending: true })
    const { category } = this.state
    const _category = slugify(category)
    const ref = firebase.database().ref(`/categories/${_category}/`)
    try {
      const res = ref.set({ id: _category, name: capitalize(category) })
      this.setState({ category: '' })
    } catch (err) {
      alert('Kategori oluşturulurken bir hata oluştu. Bu hata internet bağlantınızdan kaynaklı olabilir.')
    } finally {
      this.setState({ pending: false })
    }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    return (
      <>
        <h1>Yeni Kategori</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            required
            placeholder="Kategori İsmi"
            label="Kategori İsmi"
            name="category"
            value={this.state.category}
            onChange={this.handleChange}
          />
          <Form.Button disabled={!this.state.category} primary loading={this.state.pending} type="submit">
            Kategori Oluştur
          </Form.Button>
        </Form>
      </>
    )
  }
}
