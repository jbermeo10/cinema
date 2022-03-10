import { CAMBIAR_RUTA, CAMBIAR_ESTA_LOGUEADO, CAMBIAR_ES_ADMIN,
  FETCH_USUARIO_PENDIENTE, FETCH_USUARIO_EXITOSO, FETCH_USUARIO_FALLIDO } from './constants.js'

// 'type' y 'payload' son nombres reservados


// *** SINCRONO ***

export const setearRuta = (texto) => {
  return {
    type: CAMBIAR_RUTA,
    payload: texto
  }
}

export const setearEstaLogueado = (booleano) => {
  return {
    type: CAMBIAR_ESTA_LOGUEADO,
    payload: booleano
  }
}

export const setearEsAdmin = (booleano) => {
  return {
    type: CAMBIAR_ES_ADMIN,
    payload: booleano
  }
}


// *** ASINCRONO ***

const serverAddress = "localhost";
// const serverAddress = "192.168.100.143";
const getToken = () => window.localStorage.getItem('token');

export const fecthUsuario = (setEsAdmin, setEstaLogueado) => (dispatch) => {
  dispatch({ type: FETCH_USUARIO_PENDIENTE })
  if(getToken()) {
    fetch(`http://${serverAddress}:3000/iniSesion`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'token': getToken()
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.id) {
        console.log(data);
        getPerfilDeToken(data.id, setEsAdmin, setEstaLogueado, dispatch);    
      } else {
        console.log("Acceso no autorizado, token invalido")
      }
    })
    .catch(err => {
      console.log(`Sin conexion al backend: ${err}`)
      dispatch({ type: FETCH_USUARIO_FALLIDO, payload: err})
    })
  } else {
    console.log('No hay token:', getToken())
  }
}

const getPerfilDeToken = (id, setEsAdmin, setEstaLogueado, dispatch) => {
  fetch(`http://${serverAddress}:3000/perfilToken/${id}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'token': getToken()
    }
  })
  .then(response => response.json())
  .then(usuario => {
    if(usuario.id) {
      console.log(usuario);
      dispatch({ type: FETCH_USUARIO_EXITOSO, payload: usuario})
      if(usuario.nombre === 'Administrador') {
        setEsAdmin(true);
      }
      setEstaLogueado(true);
    } else {
      console.log("Acceso no autorizado, token invalido: usuario")
    }
  })
  .catch(err => console.log(`Sin conexion al backend: ${err}`))
}