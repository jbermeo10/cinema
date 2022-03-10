import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav } from 'mdbreact';
import { setearRuta } from '../actions';
import './NavBar.css';

const DropDownUsuario = React.lazy(() => import('./DropDownUsuario'))

const mapStateToProps = (estado) => {
  return {
    estaLogueado: estado.estaLogueado,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setRuta: (texto) => dispatch(setearRuta(texto)),
  }
}

const NavBar = (props) => {
  const { estaLogueado, setRuta } = props;

  if(estaLogueado) {
    return(
      <MDBNavbar color="blue" expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">CINEMA PLUS ®</strong>
        </MDBNavbarBrand>
        <MDBNavbarNav right>
          <Suspense fallback={<h1 className="text-center mt-5">Cargando...</h1>}>
            <DropDownUsuario />
          </Suspense>
          <p className="mx-3 my-1 text-white enlace" 
            onClick={() => setRuta('home')}>Página Inicial</p>
          <p className="mx-3 my-1 text-white enlace" 
            onClick={() => setRuta('peliculas')}>Cartelera</p>
        </MDBNavbarNav>
      </MDBNavbar>
    )
  } else {
    return(
      <MDBNavbar color="blue" expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">CINEMA PLUS ®</strong>
        </MDBNavbarBrand>
        <MDBNavbarNav right>
          <p className="mx-3 my-1 text-white enlace" 
            onClick={() => setRuta('home')}>Página Inicial</p>
          <p className="mx-3 my-1 text-white enlace" 
            onClick={() => setRuta('signin')}>Iniciar Sesión</p>
          <p className="mx-3 my-1 text-white enlace" 
            onClick={() => setRuta('register')}>Registrarse</p>
          <p className="mx-3 my-1 text-white enlace" 
            onClick={() => setRuta('peliculas')}>Cartelera</p>
        </MDBNavbarNav>
      </MDBNavbar>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

