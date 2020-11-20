import React, { Component } from 'react'
import CreateCategory from './CreateCategory'
import ListCategories from './ListCategories'

export default class Categories extends Component {
  render() {
    return (
      <>
        <CreateCategory />
        <ListCategories/>
      </>
    )
  }
}
