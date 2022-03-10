import { CAMBIAR_USUARIO, CAMBIAR_RUTA, CAMBIAR_ESTA_LOGUEADO, CAMBIAR_ES_ADMIN } 
  from './constants.js'

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

export const setearUsuario = (objeto) => {
  return {
    type: CAMBIAR_USUARIO,
    payload: objeto
  }
}
