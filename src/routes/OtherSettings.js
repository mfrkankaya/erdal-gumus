import React, { Component } from 'react'
import { Container, Divider } from 'semantic-ui-react'
import { Route } from 'react-router-dom'
import Categories from '../components/categories'
import SubCategories from '../components/subCategories'
import Colors from '../components/colors'
import Covers from '../components/covers'
import ImageSize from '../components/ImageSize'
import TableSize from '../components/TableSize'

export default class OtherSettings extends Component {
  render() {
    return (
      <Container>
        <br></br>
        <span style={{ fontSize: '.75rem' }}>*(Bir elemanı silmek için üstüne tıklayabilirsiniz.)</span>
        <div className=" flex flex-col">
          <div className="p-1 mb-1" style={{ border: '1px solid #ccc', borderRadius: '.5rem' }}>
            <Categories />
          </div>
          <div className="p-1 mb-1" style={{ border: '1px solid #ccc', borderRadius: '.5rem' }}>
            <SubCategories />
          </div>
          <div className="p-1 mb-1" style={{ border: '1px solid #ccc', borderRadius: '.5rem' }}>
            <Colors />
          </div>
          <div className="p-1 mb-1" style={{ border: '1px solid #ccc', borderRadius: '.5rem' }}>
            <Covers />
          </div>
          <div className="p-1 mb-1" style={{ border: '1px solid #ccc', borderRadius: '.5rem' }}>
            <ImageSize />
          </div>
          <div className="p-1 mb-1" style={{ border: '1px solid #ccc', borderRadius: '.5rem' }}>
            <TableSize />
          </div>
          <br></br>
        </div>
      </Container>
    )
  }
}
