import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import CreatePattern from '../components/patterns/CreatePattern'
import ListPatterns from '../components/patterns/ListPatterns'

export default class Patterns extends Component {
  render() {
    return (
      <Container>
        <CreatePattern />
        <ListPatterns />
      </Container>
    )
  }
}
