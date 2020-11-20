import React, { Component } from 'react'
import CreateColor from './CreateColor'
import ListColors from './ListColors'

export default class Colors extends Component {
  render() {
    return (
      <>
        <CreateColor />
        <ListColors />
      </>
    )
  }
}
