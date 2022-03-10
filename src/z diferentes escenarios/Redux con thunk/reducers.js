import { CAMBIAR_RUTA, CAMBIAR_ESTA_LOGUEADO, CAMBIAR_ES_ADMIN, 
  FETCH_USUARIO_PENDIENTE, FETCH_USUARIO_EXITOSO, FETCH_USUARIO_FALLIDO } 
  from './constants.js'


// *** SINCRONO ***

const estadoInicialSincrono = {
  ruta: 'home',
  estaLogueado: false,
  esAdmin: false,
}

export const sincrono = (estado=estadoInicialSincrono, accion={}) => {
  switch(accion.type){
    case CAMBIAR_RUTA:
      return  { ...estado, ruta: accion.payload }
    case CAMBIAR_ESTA_LOGUEADO:
      return  { ...estado, estaLogueado: accion.payload }
    case CAMBIAR_ES_ADMIN:
      return  { ...estado, esAdmin: accion.payload }
    default:
      return estado;
  }
}


// *** ASINCRONO ***

const estadoInicialAsincrono = {
  usuario: {
    id: '',
    nombre: '',
    cedula: '',
    celular: '',
    email: '',
    joined: new Date()
  },
  usuarioPendiente: false,
  error: '',
}

export const asincrono = (estado=estadoInicialAsincrono, accion={}) => {
  switch(accion.type){
    case FETCH_USUARIO_PENDIENTE:
      return { ...estado, usuarioPendiente: true }
    case FETCH_USUARIO_EXITOSO:
      return { ...estado, usuario: accion.payload, usuarioPendiente: false }
    case FETCH_USUARIO_FALLIDO:
      return { ...estado, error: accion.payload, usuarioPendiente: false }
    default:
      return estado;
  }
}