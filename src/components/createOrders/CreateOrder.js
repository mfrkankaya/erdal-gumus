import React, { Component } from 'react'
import * as firebase from 'firebase'
import { Form, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { categoryChanged, searchtextChanged } from '../../store/actions'
import SortedProductsList from './SortedProductsList'
import PrepareOrder from './PrepareOrder'

class CreateOrder extends Component {
  render() {
    const { parentCategory, subCategory, searchText } = this.props
    const preparedParentCategories = [
      { text: 'Kategorisiz', value: '', key: '' },
      ...this.props.categories.map(cat => ({ text: cat.name, value: cat.id, key: cat.id }))
    ]
    const preparedSubCategories = this.props.subCategories
      .filter(cat => cat.parentCategory === parentCategory)
      .map(cat => ({ text: cat.name, value: cat.id, key: cat.id }))

    let sortedProductsList = [],
      searchedProductsList = []
    if (subCategory) sortedProductsList = this.props.products.filter(prod => prod.subCategory === subCategory)
    else if (parentCategory) sortedProductsList = this.props.products.filter(prod => prod.parentCategory === parentCategory)
    else sortedProductsList = this.props.products

    if (searchText) searchedProductsList = sortedProductsList.filter(prod => prod.code.toLowerCase().includes(searchText.toLowerCase()))
    else searchedProductsList = [...sortedProductsList]

    return (
      <div className="per-w-90 flex flex-col" style={{ margin: '0 auto' }}>
        <Container>
          <br></br>

          <h1>Yeni Sipariş</h1>
          <Form onSubmit={e => e.preventDefault()}>
            <Form.Group widths="equal">
              <Form.Select
                placeholder="Ana Kategori"
                label="Ana Kategori"
                options={preparedParentCategories}
                onChange={(e, { value }) => this.props.categoryChanged({ name: 'parentCategory', value })}
                value={parentCategory}
              />
              <Form.Select
                placeholder="Alt Kategori"
                label="Alt Kategori"
                options={parentCategory ? preparedSubCategories : []}
                onChange={(e, { value }) => this.props.categoryChanged({ name: 'subCategory', value })}
                value={subCategory}
                disabled={!parentCategory}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                label="Ürün Arama"
                placeholder="Aranacak Kelime"
                onChange={e => this.props.searchtextChanged(e.target.value)}
                value={searchText}
              />
            </Form.Group>
          </Form>
        </Container>
        <SortedProductsList data={searchedProductsList} />
        <PrepareOrder />
      </div>
    )
  }
}

const mapStateToProps = ({
  general: { categories, patterns, subCategories, products },
  order: { parentCategory, subCategory, searchText }
}) => ({
  categories,
  patterns,
  subCategories,
  products,
  parentCategory,
  subCategory,
  searchText
})

export default connect(
  mapStateToProps,
  { categoryChanged, searchtextChanged }
)(CreateOrder)
