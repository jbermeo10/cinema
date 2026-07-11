import { CAMBIAR_USUARIO, CAMBIAR_RUTA, CAMBIAR_ESTA_LOGUEADO, CAMBIAR_ES_ADMIN } //variables que se importan, forma parte del esquema redux
  from './constants.js'

// Estas son las variables de estado que se leen a lo largo de los diferentes componentes de toda la app  
const estadoInicial = {
  usuario: {
    id: '',
    nombre: '',
    cedula: '',
    celular: '',
    email: '',
    joined: new Date()
  },
  ruta: 'cartSimple',
  estaLogueado: false,
  esAdmin: false,
}

//Esta es la funcion que actualiza cada una de las variables de estado, forma parte del esquema Redux
export const updateEstado = (estado=estadoInicial, accion={}) => {
  switch(accion.type){
    case CAMBIAR_USUARIO:
      // return  { ...estado, usuario: accion.payload } //forma mas moderna de actualizarlo, no se porq lo habre comentado
      return Object.assign({}, estado, {usuario: accion.payload})  //forma antigua de actualizar el estado
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
