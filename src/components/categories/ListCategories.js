import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Divider } from 'semantic-ui-react'
import * as firebase from 'firebase'

class ListCategories extends Component {
  removeItem = id => {
    firebase
      .database()
      .ref(`/categories/${id}`)
      .remove()
      .then(() => null)
      .catch(() => alert('Öğe silinirken bir hata oluştu.'))
  }

  render() {
    return (
      <>
        <h2>Kategoriler</h2>
        <div className="flex flex-row wrap">
          {this.props.categories.map(item => (
            <div onClick={() => this.removeItem(item.id)} className="simple-list-item" key={item.id}>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </>
    )
  }
}

const mapStateToProps = ({ general: { categories } }) => ({ categories })
export default connect(
  mapStateToProps,
  {}
)(ListCategories)
