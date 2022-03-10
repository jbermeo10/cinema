import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Register from './components/Register';
import Signin from './components/Signin';
import Perfil from './components/Perfil';
import NavBar from './components/NavBar';
import Salas from './components/Salas';
import AdminPelis from './components/AdminPelis';
import CarteleraSimple from './components/CarteleraSimple';
import CarteleraDetallada from './components/CarteleraDetallada';
import ErrorBoundary from './components/ErrorBoundary';
import { setearEstaLogueado, setearEsAdmin, fecthUsuario } from './actions';

const mapStateToProps = (estado) => {
  return {
    ruta: estado.sincrono.ruta,
    usuario: estado.asincrono.usuario,
    usuarioPendiente: estado.asincrono.usuario,
    error: estado.asincrono.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setEstaLogueado: (booleano) => dispatch(setearEstaLogueado(booleano)),
    setEsAdmin: (booleano) => dispatch(setearEsAdmin(booleano)),
    checkTokenCall: (setEsAdmin, setEstaLogueado) => dispatch(fecthUsuario(setEsAdmin, setEstaLogueado))
  }
}

function App(props) {
  const { ruta, setEstaLogueado, setEsAdmin } = props;

  useEffect(() => {
    checkTokenCall(setEsAdmin, setEstaLogueado)
  }, []);

  const enrutamiento = () => {
    switch (ruta) {
      case "home":
        return <CarteleraSimple />
      case "salas":
        return <Salas />
      case "edit_pelis":
        return <AdminPelis />
      case "register":
        return <Register  />
      case "signin":
        return <Signin />
      case "peliculas":
        return <CarteleraDetallada />
      case "perfil":
        return <Perfil />
      default:
        return <h1>Ruta no especificada</h1>
    }
  }
  return (
    <div className='App'>
      <NavBar />
      <ErrorBoundary>
      { enrutamiento() }
      </ErrorBoundary>
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
