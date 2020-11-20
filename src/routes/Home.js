import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const containerStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  flexWrap: 'wrap',
  paddingTop: '1rem'
}

export default class Home extends Component {
  render() {
    return (
      <Container>
        <div style={containerStyle}>
          <NavButton href="/app/mumKaliplari" label="Mum Kalıpları" />
          <NavButton href="/app/urunler" label="Ürünler" />
          <NavButton href="/app/siparisler" label="Siparişler" />
          <NavButton href="/app/siparisOlustur" label="Yeni Sipariş" />
          <NavButton href="/app/digerAyarlar" label="Diğer Ayarlar" />
        </div>
      </Container>
    )
  }
}

const NavButton = ({ href, label }) => (
  <Link className="home-link" to={href}>
    {label}
  </Link>
)
