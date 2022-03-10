export const esValidNombre = (nombre) => {
  return nombre.length > 0 ? true : false
}
export const esValidCedula = (cedula) => {
  return cedula.length > 0 ? true : false
}
export const esValidEmail = (email) => {
  // if ( email.length > 10 && email.substring(email.length-10) === "@gmail.com" ) {
  if ( email.match(/[a-z0-9._%+-]+@[a-z0-9-.]+\.[a-z]{2,}$/) ) {
    return true;
  } else {
    return false;
  }
}
export const esValidContrasena = (contrasena) => {
  return contrasena.length > 4 ? true : false
}