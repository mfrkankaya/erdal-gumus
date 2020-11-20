import React, { Component } from 'react'

export default class Input extends Component {
  render() {
    return (
      <input
        className={`short-field${this.props.type === '1' ? ' unit' : ''}`}
        {...this.props}
        style={{ borderRadius: '.25rem', border: '1px solid #ddd', marginLeft: '.1rem', textAlign: 'center' }}
      />
    )
  }
}

Input.defaultProps = {
  type: '0'
}
