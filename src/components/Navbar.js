import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Container, Button } from 'semantic-ui-react'
import * as firebase from 'firebase'

const Navbar = () => {
  const [active, setActive] = useState(false)

  return (
    <>
      <nav>
        <Container>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              height: '5rem',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <div onClick={() => setActive(!active)} className={`menu-button${active ? ' active' : ''}`}></div>
            <NavLink activeClassName="active-link" to="/anasayfa" className="brand">
              Erdal Gümüş
            </NavLink>
            <div className={`navlinks${active ? ' active' : ''}`}>
              <NavLink onClick={() => setActive(false)} activeClassName="active-link" to="/app/mumKaliplari">
                Mum Kalıpları
              </NavLink>
              <NavLink onClick={() => setActive(false)} activeClassName="active-link" to="/app/urunler">
                Ürünler
              </NavLink>
              <NavLink onClick={() => setActive(false)} activeClassName="active-link" to="/app/siparisler">
                Siparişler
              </NavLink>
              <NavLink onClick={() => setActive(false)} activeClassName="active-link" to="/app/siparisOlustur">
                Yeni Sipariş
              </NavLink>
              <NavLink onClick={() => setActive(false)} activeClassName="active-link" to="/app/digerAyarlar">
                Diğer Ayarlar
              </NavLink>
            </div>
            <Button onClick={() => firebase.auth().signOut()} className="signout" basic color="grey">
              Çıkış Yap
            </Button>
          </div>
        </Container>
      </nav>
      <div className="pt-5"></div>
    </>
  )
}

export default Navbar
