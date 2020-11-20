import React, { Component } from 'react'

export default class Dropdown extends Component {
  render() {
    return (
      <select className="short-field" {...this.props}>
        <option value="">Seçilmemiş</option>
        {this.props.options.map((item, i) => (
          <option value={item.value} key={item.key}>
            {item.text}
          </option>
        ))}
      </select>
    )
  }
}
