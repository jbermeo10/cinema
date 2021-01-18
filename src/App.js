//import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import UserDataRegister from './UserDataRegister';
import UserDataLogin from './UserDataLogin';
import ListaPeliculas from './ListaPeliculas';
import { peliculas } from './DBpeliculas';

function App() {
  // Variables van aqui
  const [route, setRoute] = useState('cartelera');
 
  const irAlRegistro = () => {
    setRoute('register');
  }
  const irAlSignin = () => {
    setRoute('signin');
  }
  const irACartelera = () => {
    setRoute('cartelera');
}
  const irAPeliculas = () => {
    setRoute('peliculas');
  }
  const cerrarSesion = () => {
    setRoute('signout');
  }
  const administrar = () => {
    setRoute('admin');
  }
  const ingresar = () => {
    console.log("trabajar en la validacion del usuario");
  }
  const registrar = () => {
    console.log("trabajar en el registro del usuario");
  }
  return (
    <div className='App'>
      <nav>
        <ul className='menu'>
          <li className='f1 mr-auto'>MENU</li>
          <li className='opciones' onClick={irAlRegistro}>Registro</li>
          <li className='opciones' onClick={irAlSignin}>Ingreso</li>
          <li className='opciones' onClick={irAPeliculas}>Películas</li>
          <li className='opciones' onClick={cerrarSesion}>Cerrar sesión</li>
          <li className='opciones' onClick={administrar}>Administrador</li>
          <li className='opciones' onClick={irACartelera}>Página Inicial</li>
        </ul>
      </nav>

      { route === 'cartelera' ?
        <div>
          <h1 className='f1'>CARTELERA</h1>
          <ListaPeliculas listado={peliculas}/>
        </div> 
        : ( route === 'signin' ?
            <div>
              <h1 className='f1'>INGRESO CINEMA</h1>
              <UserDataLogin />
              <button className='f3 ma4' onClick={ingresar}>Ingresar</button>
              <p className='f2'>Si usted aún no es usuario,
                <span className='underline pointer' onClick={irAlRegistro}>regístrese aquí</span>
              </p>
            </div>
        : ( route === 'register' ?
            <div>
              <h1 className='f1'>REGISTRO CINEMA</h1>
              <UserDataRegister />
              <button className='f3 ma4' onClick={registrar}>Registro</button>
            </div>
        : ( route === 'admin' ?
            <div>
              <h1 className='f1'>ADMINISTRADOR</h1>
              <p className='f2'>En construcción</p>
            </div> 
        : ( route === 'signout' ?
            <div>
              <h1 className='f1'>CERRAR SESION</h1>
              <p className='f2'>En construcción</p>
            </div> 
        : ( route === 'peliculas' ?
            <div>
              <h1 className='f1'>PELICULAS</h1>
              <p className='f2'>En construcción</p>
            </div> 
        : ( <div></div>    
              
          ))))))
        
      }
    </div>
  );
}

export default App;
