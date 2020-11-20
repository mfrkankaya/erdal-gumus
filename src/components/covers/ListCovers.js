import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Divider } from 'semantic-ui-react'
import * as firebase from 'firebase'

class ListCovers extends Component {
  removeItem = id => {
    firebase
      .database()
      .ref(`/covers/${id}`)
      .remove()
      .then(() => null)
      .catch(() => alert('Öğe silinirken bir hata oluştu.'))
  }

  render() {
    return (
      <>
        <h2>Kaplamalar</h2>
        <div className="flex flex-row wrap">
          {this.props.covers.map(item => (
            <div onClick={() => this.removeItem(item.id)} className="simple-list-item" key={item.id}>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </>
    )
  }
}

const mapStateToProps = ({ general: { covers } }) => ({ covers })
export default connect(
  mapStateToProps,
  {}
)(ListCovers)
