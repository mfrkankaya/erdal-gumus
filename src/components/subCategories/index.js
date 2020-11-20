import React, { Component } from 'react'
import CreateSubCategory from './CreateSubCategory'
import ListSubCategories from './ListSubCategories'

export default class Categories extends Component {
  render() {
    return (
      <>
        <CreateSubCategory />
        <ListSubCategories />
      </>
    )
  }
}
