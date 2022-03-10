import React, { useState, useEffect, Suspense } from 'react';
import { checkTokenCall } from './components/ApiCalls.js'
import ErrorBoundary from './components/ErrorBoundary';
import NavBar from './components/NavBar';
import CarteleraSimple from './components/CarteleraSimple';
// import Register from './components/Register';
// import Signin from './components/Signin';
// import Perfil from './components/Perfil';
// import Salas from './components/Salas';
// import AdminPelis from './components/AdminPelis';
// import CarteleraDetallada from './components/CarteleraDetallada';

const Register = React.lazy(() => import('./components/Register'))
const Signin = React.lazy(() => import('./components/Signin'))
const Perfil = React.lazy(() => import('./components/Perfil'))
const Salas = React.lazy(() => import('./components/Salas'))
const AdminPelis = React.lazy(() => import('./components/AdminPelis'))
const CarteleraDetallada = React.lazy(() => import('./components/CarteleraDetallada'))

const iniUsuario = {
  id: '',
  nombre: '',
  cedula: '',
  celular: '',
  email: '',
  joined: ''
}

function App() {
  const [ruta, setRuta] = useState('home');
  const [usuario, setUsuario] = useState(iniUsuario);
  const [estaLogueado, setEstaLogueado] = useState(false);
  const [esAdmin, setEsAdmin] = useState(false);
  const [count, setCount] = useState(0);
  const darClic = () => setCount(count+1)
  
  useEffect(() => checkTokenCall(setUsuario, setEsAdmin, setEstaLogueado), []);

  const enrutamiento = () => {
    switch (ruta) {
      case "home":
        return <CarteleraSimple />
      case "salas":
        return <Salas />
      case "edit_pelis":
        return <AdminPelis />
      case "register":
        return <Register
          setEstaLogueado={setEstaLogueado} setEsAdmin={setEsAdmin} setUsuario={setUsuario} setRuta={setRuta} />
      case "signin":
        return <Signin 
        setRuta={setRuta} setEstaLogueado={setEstaLogueado} setUsuario={setUsuario} setEsAdmin={setEsAdmin} />
      case "peliculas":
        return <CarteleraDetallada 
          estaLogueado={estaLogueado} usuario={usuario} setRuta={setRuta} />
      case "perfil":
        return <Perfil 
        setRuta={setRuta} usuario={usuario} setUsuario={setUsuario} esAdmin={esAdmin} />
      default:
        return <h1>Ruta no especificada</h1>
    }
  }
  return (
    <div className='App'>
      <NavBar 
        setRuta={setRuta} estaLogueado={estaLogueado} usuario={usuario} esAdmin={esAdmin} 
        setEstaLogueado={setEstaLogueado} setEsAdmin={setEsAdmin} setUsuario={setUsuario}/>
        <button className='m-3 shadow' onClick={() => darClic(count)}>Veces: {count}</button>
      <ErrorBoundary>
        <Suspense fallback={<h1 className="text-center mt-5">Cargando...</h1>}>
          { enrutamiento() }
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
