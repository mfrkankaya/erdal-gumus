import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Divider } from 'semantic-ui-react'
import * as firebase from 'firebase'

class ListSubCategories extends Component {
  removeItem = id => {
    firebase
      .database()
      .ref(`/subCategories/${id}`)
      .remove()
      .then(() => null)
      .catch(() => alert('Öğe silinirken bir hata oluştu.'))
  }

  render() {
    return (
      <>
        <h2>Alt Kategoriler</h2>
        <div className="flex flex-row wrap">
          {this.props.subCategories.map(item => (
            <div onClick={() => this.removeItem(item.id)} className="simple-list-item" key={item.id}>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </>
    )
  }
}

const mapStateToProps = ({ general: { subCategories, categories } }) => ({ subCategories, categories })
export default connect(
  mapStateToProps,
  {}
)(ListSubCategories)
