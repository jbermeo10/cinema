import React, { Suspense } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav } from 'mdbreact';
import './NavBar.css';
// import DropDownUsuario from './DropDownUsuario';
const DropDownUsuario = React.lazy(() => import('./DropDownUsuario'))

const NavBar = ({ setRuta, estaLogueado, usuario, esAdmin, setEstaLogueado, setEsAdmin, setUsuario }) => {

  if(estaLogueado) {
    return(
      <MDBNavbar color="blue" expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">CINEMA PLUS ®</strong>
        </MDBNavbarBrand>
        <MDBNavbarNav right>
          <Suspense fallback={<h1 className="text-center mt-5">Cargando...</h1>}>
            <DropDownUsuario setRuta={setRuta} usuario={usuario} esAdmin={esAdmin} 
              setEstaLogueado={setEstaLogueado} setEsAdmin={setEsAdmin} setUsuario={setUsuario}/>
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

export default NavBar;

