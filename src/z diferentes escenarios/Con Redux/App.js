import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import { checkTokenCall } from './components/ApiCalls.js'
import { setearUsuario, setearEstaLogueado, setearEsAdmin } from './actions';

import NavBar from './components/NavBar';
import ErrorBoundary from './components/ErrorBoundary';
import CarteleraSimple from './components/CarteleraSimple';
const Register = React.lazy(() => import('./components/Register'))
const Signin = React.lazy(() => import('./components/Signin'))
const Perfil = React.lazy(() => import('./components/Perfil'))
const Salas = React.lazy(() => import('./components/Salas'))
const AdminPelis = React.lazy(() => import('./components/AdminPelis'))
const CarteleraDetallada = React.lazy(() => import('./components/CarteleraDetallada'))

const mapStateToProps = (estado) => {
  return { ruta: estado.ruta }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUsuario: (obj) => dispatch(setearUsuario(obj)),
    setEstaLogueado: (booleano) => dispatch(setearEstaLogueado(booleano)),
    setEsAdmin: (booleano) => dispatch(setearEsAdmin(booleano)),
  }
}

function App(props) {
  const { ruta, setUsuario, setEstaLogueado, setEsAdmin } = props;

  useEffect(() => {
    checkTokenCall(setUsuario, setEsAdmin, setEstaLogueado)
  }, [setUsuario, setEsAdmin, setEstaLogueado]);
  
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
        <Suspense fallback={<h1 className="text-center mt-5">Cargando...</h1>}>
          { enrutamiento() }
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
