import React, { Component } from "react"
import { connect } from "react-redux"
import { Table, Form } from "semantic-ui-react"
import ProductListItem from "./ProductListItem"
import Pagination from "../Pagination"

const SEED = 30

class ListProducts extends Component {
  state = {
    parentCategory: "",
    subCategory: "",
    searchText: "",
    page: 1,
    totalPage: null
  }

  componentWillReceiveProps(nextProps) {
    this.calculateTotalPage(nextProps)
  }

  componentWillMount() {
    this.calculateTotalPage(this.props)
  }

  calculateTotalPage = props => {
    const { products } = props
    this.setState({ totalPage: Math.ceil(products.length / SEED) })
  }

  setActivePage = page => this.setState({ page })

  render() {
    const { parentCategory, subCategory, searchText } = this.state
    const preparedParentCategories = [
      { text: "Kategorisiz", value: "", key: "" },
      ...this.props.categories.map(cat => ({
        text: cat.name,
        value: cat.id,
        key: cat.id
      }))
    ]
    const preparedSubCategories = this.props.subCategories
      .filter(cat => cat.parentCategory === parentCategory)
      .map(cat => ({ text: cat.name, value: cat.id, key: cat.id }))

    let sortedProductsList = [],
      searchedProductsList = []
    if (subCategory)
      sortedProductsList = this.props.products.filter(
        prod => prod.subCategory === subCategory
      )
    else if (parentCategory)
      sortedProductsList = this.props.products.filter(
        prod => prod.parentCategory === parentCategory
      )
    else sortedProductsList = [...this.props.products]

    if (searchText)
      searchedProductsList = sortedProductsList.filter(prod =>
        prod.code.toLowerCase().includes(searchText.toLowerCase())
      )
    else searchedProductsList = [...sortedProductsList]

    const filtered = this.props.products.length !== searchedProductsList.length

    const productsToShow = searchedProductsList.filter(
      (_, index) =>
        index < SEED * this.state.page && index >= SEED * (this.state.page - 1)
    )
    return (
      <>
        <br></br>
        <h1>Tüm Ürünler [{this.props.products.length} Ürün]</h1>
        <Form onSubmit={e => e.preventDefault()}>
          <Form.Group widths="equal">
            <Form.Select
              placeholder="Ana Kategori"
              label="Ana Kategori"
              options={preparedParentCategories}
              onChange={(e, { value }) =>
                this.setState({ parentCategory: value, subCategory: "" })
              }
              value={parentCategory}
            />
            <Form.Select
              placeholder="Alt Kategori"
              label="Alt Kategori"
              options={parentCategory ? preparedSubCategories : []}
              onChange={(e, { value }) => this.setState({ subCategory: value })}
              value={subCategory}
              disabled={!parentCategory}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              label="Ürün Arama"
              placeholder="Aranacak Kelime"
              onChange={e => this.setState({ searchText: e.target.value })}
              value={searchText}
            />
          </Form.Group>
        </Form>
        {filtered && <h4>Filtrelenmiş [{searchedProductsList.length} Ürün]</h4>}
        <Pagination
          activePage={this.state.page}
          totalPage={this.state.totalPage}
          setActivePage={this.setActivePage}
        />
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell collapsing>Ürün</Table.HeaderCell>
              <Table.HeaderCell>Kod</Table.HeaderCell>
              <Table.HeaderCell collapsing></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {productsToShow.map((item, index) => (
              <ProductListItem key={index} index={index} item={item} />
            ))}
          </Table.Body>
        </Table>
        <Pagination
          activePage={this.state.page}
          totalPage={this.state.totalPage}
          setActivePage={this.setActivePage}
        />
        <br></br>
        <br></br>
      </>
    )
  }
}

const mapStateToProps = ({
  general: { products, categories, subCategories }
}) => ({ products, categories, subCategories })

export default connect(mapStateToProps)(ListProducts)
