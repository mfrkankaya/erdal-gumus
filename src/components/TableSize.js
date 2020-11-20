import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as firebase from 'firebase'

class TableSize extends Component {
  state = {
    value: 0.85
  }

  componentWillMount() {
    this.setState({ value: this.props.tableSize })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.tableSize })
  }

  handleSubmit = e => {
    e.preventDefault()
    if (parseFloat(this.state.value)) {
      firebase
        .database()
        .ref('tableSize')
        .set(parseFloat(this.state.value))
        .then(() => alert('Tablo boyutu başarıyla değiştirildi.'))
        .catch(() => alert('Boyut değiştirilirken bir hata oluştu. Bu internetle alakalı olabilir. Birkaç saniye sonra tekrar deneyin.'))
    } else {
      alert(
        'Girdiğiniz değer uygun formatta değil. "1.2" veya "0.85" gibi değerler girebilirsiniz. Tamsayı da olabilir "1" veya "2" gibi. '
      )
    }
  }

  render() {
    return (
      <>
        <br></br>
        <h1>Tablo Boyutu</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label="Boyut"
            placeholder="Boyut"
            required
            value={this.state.value}
            onChange={e => this.setState({ value: e.target.value })}
          />
          <Form.Button type="submit" primary disabled={!this.state.value}>
            Tablo Boyutunu Kaydet
          </Form.Button>
        </Form>
        <table className="mt-1" style={{ transform: `scale(${parseFloat(this.state.value)})` }}>
          <thead>
            <tr>
              <th>Taş Rengi</th>
              <th colSpan="3">Kaplama</th>
            </tr>
            <tr>
              <th></th>
              <th>Rose</th>
              <th>Rodaj</th>
              <th>Gold</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Beyaz</th>
              <td>10</td>
              <td></td>
              <td>20</td>
            </tr>
            <tr>
              <th>Kırmızı</th>
              <td>10</td>
              <td>30</td>
              <td>50</td>
            </tr>
            <tr>
              <th>Yeşil</th>
              <td>40</td>
              <td>200</td>
              <td>10</td>
            </tr>
          </tbody>
        </table>
      </>
    )
  }
}

const mapStateToProps = ({ general: { tableSize } }) => ({ tableSize })

export default connect(mapStateToProps)(TableSize)
