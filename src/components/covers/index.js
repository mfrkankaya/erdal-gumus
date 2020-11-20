import React, { Component } from 'react'
import CreateCover from './CreateCover'
import ListCovers from './ListCovers'

export default class Colors extends Component {
  render() {
    return (
      <>
        <CreateCover />
        <ListCovers />
      </>
    )
  }
}
