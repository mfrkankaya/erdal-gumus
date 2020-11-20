import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import * as firebase from 'firebase'
import { slugify, capitalize } from '../../helpers'
import { connect } from 'react-redux'

class CreateSubCategory extends Component {
  state = {
    parentCategory: '',
    subCategory: '',
    pending: false
  }

  handleSubmit = async e => {
    e.preventDefault()
    this.setState({ pending: true })
    const { subCategory, parentCategory } = this.state
    const _subCategory = slugify(subCategory)
    const ref = firebase.database().ref(`/subCategories/${_subCategory}/`)
    try {
      const res = ref.set({ id: _subCategory, name: capitalize(subCategory), parentCategory })
      this.setState({ subCategory: '', parentCategory: '' })
    } catch (err) {
      alert('Kategori oluşturulurken bir hata oluştu. Bu hata internet bağlantınızdan kaynaklı olabilir.')
    } finally {
      this.setState({ pending: false })
    }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    const { parentCategory, subCategory } = this.state
    const preparedCategoriesData = this.props.categories.map(cat => ({ text: cat.name, value: cat.id, key: cat.id }))
    return (
      <>
        <h1>Yeni Alt Kategori</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Select
              required
              placeholder="Ana Kategori İsmi"
              label="Ana Kategori İsmi"
              options={preparedCategoriesData}
              onChange={(e, { value }) => this.setState({ parentCategory: value })}
              value={parentCategory}
            />
            <Form.Input
              required
              placeholder="Alt Kategori İsmi"
              label="Alt Kategori İsmi"
              name="subCategory"
              value={subCategory}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Button primary disabled={!parentCategory || !subCategory} loading={this.state.pending} type="submit">
            Kategori Oluştur
          </Form.Button>
        </Form>
      </>
    )
  }
}

const mapStateToProps = ({ general: { categories } }) => ({ categories })

export default connect(
  mapStateToProps,
  {}
)(CreateSubCategory)
