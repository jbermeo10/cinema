import { CAMBIAR_USUARIO, CAMBIAR_RUTA, CAMBIAR_ESTA_LOGUEADO, CAMBIAR_ES_ADMIN }
  from './constants.js'

const estadoInicial = {
  usuario: {
    id: '',
    nombre: '',
    cedula: '',
    celular: '',
    email: '',
    joined: new Date()
  },
  ruta: 'home',
  estaLogueado: false,
  esAdmin: false,
}

export const updateEstado = (estado=estadoInicial, accion={}) => {
  switch(accion.type){
    case CAMBIAR_USUARIO:
      // return  { ...estado, usuario: accion.payload }
      return Object.assign({}, estado, {usuario: accion.payload})
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
