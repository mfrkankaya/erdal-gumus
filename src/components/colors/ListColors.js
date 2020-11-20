import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Divider } from 'semantic-ui-react'
import * as firebase from 'firebase'

class ListColors extends Component {
  removeItem = id => {
    firebase
      .database()
      .ref(`/colors/${id}`)
      .remove()
      .then(() => null)
      .catch(() => alert('Öğe silinirken bir hata oluştu.'))
  }

  render() {
    return (
      <>
        <h2>Renkler</h2>
        <div className="flex flex-row wrap">
          {this.props.colors.map(item => (
            <div onClick={() => this.removeItem(item.id)} className="simple-list-item" key={item.id}>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </>
    )
  }
}

const mapStateToProps = ({ general: { colors } }) => ({ colors })
export default connect(
  mapStateToProps,
  {}
)(ListColors)
