import React, { useEffect, Suspense } from 'react'; // Esto lo uso abajo en lineas 39 y 76
import { connect } from 'react-redux'; // Esto forma parte de Redux
import { checkTokenCall } from './components/ApiCalls.js' // Esto es una funcion importada de ApiCalls.js para validar token de usuario
import { setearUsuario, setearEstaLogueado, setearEsAdmin } from './actions'; // Funciones aparentemente para actualizar las variables de estado 

import NavBar from './components/NavBar'; // Barra de navegacion, fija en todas las pantallas
import ErrorBoundary from './components/ErrorBoundary'; // Pantalla de error en caso falle la logica de la app
import CarteleraSimple from './components/CarteleraSimple'; // Solo cargo esta que es la pantalla inicial de la app, las otras cargan solo si son llamadas
// Las otras 6 posibles pantallas se cargan solo si son llamadas para hacer mas rapida la carga de la 1ra pantalla, se usa funcion react.lazy 
const Register = React.lazy(() => import('./components/Register'))
const Signin = React.lazy(() => import('./components/Signin'))
const Perfil = React.lazy(() => import('./components/Perfil'))
const Salas = React.lazy(() => import('./components/Salas'))
const AdminPelis = React.lazy(() => import('./components/AdminPelis'))
const CarteleraDetallada = React.lazy(() => import('./components/CarteleraDetallada'))

// Esto es la porcion del estado que se escucha y que se envia como propiedades (esto es parte de Redux)
// Basicamente me dice en que pantalla estoy actualmente
const mapStateToProps = (estado) => {
  return { ruta: estado.ruta }
}

// Acciones a escuchar que necesitan ser despachadas (esto es parte de Redux)
const mapDispatchToProps = (dispatch) => {
  // Las 3 cosas son parte del estado general, mas la ruta de arriba
  return {
    setUsuario: (obj) => dispatch(setearUsuario(obj)),
    setEstaLogueado: (booleano) => dispatch(setearEstaLogueado(booleano)),
    setEsAdmin: (booleano) => dispatch(setearEsAdmin(booleano)),
  }
}

// Esto es la funcion de mi app, lo que se muestra en pantalla
function App(props) {
  // Estas son mis 4 variables de estado, siempre van como props, para Redux
  const { ruta, setUsuario, setEstaLogueado, setEsAdmin } = props;

  // useEffect sirve para la llamada asincrona de la informacion de usuario desde el backend con la funcion checkToken, la cual valida el usuario logueado 
  useEffect(() => {
    // Funcion checkTokenCall esta dentro de archivo 'ApiCalls.js' la cual valida el usuario actual
    checkTokenCall(setUsuario, setEsAdmin, setEstaLogueado)
  }, [setUsuario, setEsAdmin, setEstaLogueado]);
  
  // En esta funcion enrutamiento se cargan las posibles pantallas de la aplicacion, sin contar el Navigation bar, q es la parte de arriba de la pantalla
  const enrutamiento = () => {
  // Aqui todas las 7 posibles pantallas de mi app, dependiendo de la variable de estado 'ruta'
  // Cada una de las 7 pantallas posibles tiene su propio archivo .js de desarrollo
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

  // Aqui se carga toda la pantalla, incluyendo el enrutamiento mas el Navigation bar que es el mismo para todas las pantallas posibles
  // Navbar: tiene su propio archivo js donde se dibuja
  // Suspense: me sirve para mostrar 'Cargando...' mientras el server descifra el token de usuario
  // ErrorBoundary: es por si algo falla en la logica de la app, mostraria un mensaje de error en la pantalla 
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

// Esta parte la exige el uso de Redux
export default connect(mapStateToProps, mapDispatchToProps)(App);
