const serverAddress = "localhost"; // para accederlo desde mi PC
// const serverAddress = "192.168.100.143"; // si deseo que lo accedan en la LAN
// const serverAddress = "ec2-3-142-91-255.us-east-2.compute.amazonaws.com"; // para accederlo desde internet

const getToken = () => window.localStorage.getItem('token'); // funcion que valida el token del usuario actual, lee el token JWT que se guardo en el localStorage 
// del navegador cuando el usuario hizo login.

const guardarToken = (token) => {
  // window.sessionStorage.setItem('token', token);  // para un solo tab
  window.localStorage.setItem('token', token); // para cualquier tab
}

export const registerCall = (user, setUsuario, setModal, setModal2, 
  setModal3, setEsAdmin) => {
  fetch(`http://${serverAddress}:3000/registro`, {  
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ formulario: user })
  })
  .then(response => response.json())
  .then(data => {
    if (data.id && data.token) {
      console.log(data);
      // setUsuario(usuario);
      // setModal(true);
      guardarToken(data.token)
      // Cargar usuario:
      getPerfil(data.id, setUsuario, setModal, setModal2, setEsAdmin); 
    } else if (data === "Usuario ya existe" ) {
      console.log(data)
      setModal3(true);
    } else {
      console.log("Error al registrar usuario en la DB")
      setModal2(true);
    }
  })
  .catch(err => console.log(`Sin conexion al backend: ${err}`))
}

export const signinCall = (signInEmail, signInContrasena, setUsuario,
  setModal, setModal1, setModal2, setModal3, setEsAdmin) => {
  fetch(`http://${serverAddress}:3000/iniSesion`, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      email: signInEmail,
      contrasena: signInContrasena
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.id && data.token) {
      console.log(data);
      guardarToken(data.token)
      // Cargar Usuario:
      getPerfil(data.id, setUsuario, setModal, setModal3, setEsAdmin);      
    } else if (data === "Contrasena incorrecta" ) {
      console.log(data)
      setModal1(true);
    } else if (data === "Usuario no registrado" ) {
      console.log(data)
      setModal2(true);
    } else {
      console.log(data)
      console.log("Falla en la consulta a la DB de usuarios")
      setModal3(true);
    }
  })
  .catch(err => console.log(`Sin conexion al backend: ${err}`))
}

const getPerfil = (id, setUsuario, setModal, setModal3, setEsAdmin) => {
  fetch(`http://${serverAddress}:3000/perfil/${id}`, {
    method: 'get',
    headers: {'Content-Type': 'application/json'}
    // headers: {
    //   'Content-Type': 'application/json',
    //   'token': token
    // }
  })
  .then(response => response.json())
  .then(usuario => {
    if(usuario.id) {
      console.log(usuario)
      setUsuario(usuario);
      if(usuario.nombre === 'Administrador' || usuario.nombre === 'Joselo') {
        setEsAdmin(true);
      }
      setModal(true);
    } else {
      console.log(usuario)
      console.log("Falla en la consulta a la DB de usuarios")
      setModal3(true);
    }
  })
  .catch(err => console.log(`Sin conexion al backend: ${err}`))
}

// Valida el token de usuario cada vez q se carga inicialmente o se refresca la pantalla
export const checkTokenCall = (setUsuario, setEsAdmin, setEstaLogueado) => {
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
        // Cargar Usuario:
        getPerfilDeToken(data.id, setUsuario, setEsAdmin, setEstaLogueado);    
      } else {
        console.log(data)
        console.log("Acceso no autorizado, token invalido")
      }
    })
    .catch(err => console.log(`Sin conexion al backend: ${err}`))
  } else {
    console.log('No hay token:', getToken())
  }
}

const getPerfilDeToken = (id, setUsuario, setEsAdmin, setEstaLogueado) => {
  fetch(`http://${serverAddress}:3000/perfilToken/${id}`, {
    method: 'get',
    // headers: {'Content-Type': 'application/json'}
    headers: {
      'Content-Type': 'application/json',
      'token': getToken()
    }
  })
  .then(response => response.json())
  .then(usuario => {
    if(usuario.id) {
      console.log(usuario)
      setUsuario(usuario);
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

export const reservaCall = (reserva, setModal2, setModal3) => {
  fetch(`http://${serverAddress}:3000/reserva`, {
    method: 'post',
    // headers: {'Content-Type': 'application/json'},
    headers: {
      'Content-Type': 'application/json',
      'token': getToken()
    },
    body: JSON.stringify({ formulario: reserva })
  })
  .then(response => response.json())
  .then(reserva => {
    if (reserva.id) {
      console.log(reserva);
      setModal2(true);
    } else {
      console.log("Error al obtener reserva de la DB", reserva);
      setModal3(true);
    }
  })
  .catch(err => console.log(`Sin conexion al backend: ${err}`))
}

export const actPerfilCall = (user, setModal, setModal2, setModal3, 
  usuario, setUsuario) => {
  fetch(`http://${serverAddress}:3000/perfil/${usuario.id}`, {
    method: 'post',
    // headers: {'Content-Type': 'application/json'},
    headers: {
      'Content-Type': 'application/json',
      'token': getToken()
    },
    body: JSON.stringify({ formulario: user })
  })
  .then(response => response.json())
  .then(resp => {
    if(resp === "Actualizacion exitosa") {
      setModal(true);
      setUsuario({...usuario, ...user})
    } else if (resp === "Usuario ya existe") {
      setModal3(true);
    } else {
      console.log("Error al actualizar datos de usuario en la DB")
      setModal2(true);
    }
  })
  .catch(err => console.log(`Sin conexion al backend: ${err}`))
}

// Con esta funcion traigo la informacion de todas las salas de la base de datos para mostrarla en el frontend
// Incluye id, numero, capacidad y tipo de sala
export const salasCall = (setSalas) => {
  fetch(`http://${serverAddress}:3000/salas`, {
    method: 'get',
    headers: {'Content-Type': 'application/json'}
  })
  .then(response => response.json())
  .then(dbSalas => {
    if (dbSalas.length) {
      setSalas(dbSalas);
    } else {
      console.log("Error al obtener salas de la DB");
    }
  })
  .catch(err => console.log(`Sin conexion al backend: ${err}`))
}

// Funcion para editar una sala de la base de datos, y actualizar el arreglo de salas, que es una variable de estado local de la pantalla Salas.js
// Modal1: Numero de sala ya existe, Modal2: Cierra el modal de editar sala, Modal3: Error al editar sala en la DB
export const actSalaCall = (salas, indice, setSalas, sala, setModal2, setModal1, setModal3) => {  
  fetch(`http://${serverAddress}:3000/salas/${sala.id}`, {
    method: 'post',
    // headers: {'Content-Type': 'application/json'} // No se porque comente esto y agregue lo de abajo ...
    headers: {
      'Content-Type': 'application/json',
      'token': getToken() // No recuerdo para que era esta funcion getTToken...
      // Segun claude, es una función que lee el JWT guardado en la cookie o localStorage y lo devuelve para mandarlo en el header.
      // El backend recibe ese token, lo valida, y si es válido procesa la petición. Si no hay token o es inválido, rechaza la solicitud de editar sala.
    },
    body: JSON.stringify({ formulario: sala })
  })
  .then(response => response.json())
  .then(resp => {
    if(resp === "Actualizacion exitosa") {
      console.log('Sala actualizada exitosamente') // Se debe borrar al final
      
      let salasCopy = [...salas];
      //salasCopy[indice] = sala;  // borrado por sugerencia de claude
      
      // Y me sugirio que vaya lo siguiente:
      const posicion = salasCopy.findIndex(sala => sala.id === Number(indice))
      salasCopy[posicion] = sala
      setSalas(salasCopy)

      setModal2(false); // modal de cierre de 'Editar Sala' luego de operacion exitosa, lo tenia al inicio, esta bien si va al final??
    } else if (resp === "Sala ya existe") {
      console.log('Sala ya existe') // Se debe borrar al final
      setModal1(true); // Modal de advertencia de que el numero de sala ya existe en la base de datos
    } else {
      console.log("Error al actualizar datos de sala en la DB") // Se debe borrar al final
      setModal3(true); // Modal de error al editar sala en la DB
    }
  })
  .catch(err => console.log(`Sin conexion al backend: ${err}`))
}

// Funcion para agregar una nueva sala a la base de datos, y actualizar el arreglo de salas, que es una variable de estado local de la pantalla Salas.js
// Modal1: Numero de sala ya existe, Modal2: Error al agregar sala a la DB, Modal3: Cierra el modal de agregar sala
export const addSalaCall = (salas, setSalas, sala, setModal3, setModal1, setModal2) => {  
  fetch(`http://${serverAddress}:3000/salas`, {
    method: 'post',
    // headers: {'Content-Type': 'application/json'} // No se porque comente esto y agregue lo de abajo ...
    headers: {
      'Content-Type': 'application/json',
      'token': getToken() // No recuerdo para que era esta funcion getTToken...
      // Segun claude, es una función que lee el JWT guardado en la cookie o localStorage y lo devuelve para mandarlo en el header.
      // El backend recibe ese token, lo valida, y si es válido procesa la petición. Si no hay token o es inválido, rechaza la solicitud de agregar sala.
    },
    body: JSON.stringify({ formulario: sala })
  })
  .then(response => response.json())
  .then(salaResp => {
    if(salaResp.id) {
      console.log('Sala agregada exitosamente') // Para validar que llegue a este punto, se debe borrar al final
      // setSalas([...salas, sala]) // Borrrado y reemplazado por lo de abajo por consejo de Claude
      setSalas([...salas, salaResp]) // Esto actualiza el arreglo de salas con la nueva sala agregada a la base de datos
      setModal3(false); //  Con esto cierro el modal de 'Agregar Sala' luego de operacion exitosa, lo tenia al inicio, esta bien si va al final?? 
    } else if (salaResp === "Sala ya existe") {
      console.log('Sala ya existe') // Se debe borrar al final
      setModal1(true); // Modal de advertencia de que el numero de sala ya existe en la base de datos
    } else {
      console.log("Error al actualizar datos de sala en la DB") // Se debe borrar al final
      setModal2(true); // Modal de error al editar sala en la DB
    }
  })
  .catch(err => console.log(`Sin conexion al backend: ${err}`))
}

// Con esta funcion borro la sala de forma definitiva de la base de datos, y actualizo el arreglo de salas
export const borrarSalaCall = (salas, setSalas, id, indice, setModal4) => {  
  fetch(`http://${serverAddress}:3000/salas/${id}`, {
    method: 'delete',
    // headers: {'Content-Type': 'application/json'}
    headers: {
      'Content-Type': 'application/json',
      'token': getToken()
    }
  })
  .then(response => response.json())
  .then(salaResp => {
    if(salaResp.id) {
      console.log('Sala borrada exitosamente') // Se debe borrar al final

      // Estas lineas me las borro Claude
      //let salasCopy = [...salas];
      //salasCopy.splice(indice, 1)
      //console.log(salasCopy)
      //setSalas([...salasCopy])

      // Y me dijo q lo que deberia ir es lo siguiente:
      let salasCopy = salas.filter(sala => sala.id !== indice)
      setSalas(salasCopy)
    } else {
      console.log("Error al borrar sala de la DB") // Se debe borrar al final
      setModal4(true);
    }
  })
  .catch(err => console.log(`Sin conexion al backend: ${err}`))
}

// Con esta funcion traigo la informacion de todas las peliculas de la base de datos para mostrarla en el frontend
// Incluye id, titulo, descripcion, duracion, genero y horas de funciones
export const peliculasCall = (setPeliculas) => {
  fetch(`http://${serverAddress}:3000/peliculas`, {
    method: 'get',
    headers: {'Content-Type': 'application/json'}
  })
  .then(response => response.json())
  .then(dbPeliculas => {
    if (dbPeliculas.length) {
      console.log(dbPeliculas); // Esto es para visualizar en consola lo que llega del backend, se debe borrar al final
      setPeliculas(dbPeliculas);
    } else {
      console.log("Error al obtener peliculas de la DB");
    }
  })
  .catch(err => console.log(`Sin conexion al backend: ${err}`))
}

export const actPeliCall = (pelis, indice, setPelis, peli, archivo, 
  setModal2, setModal, setModal3) => {  
  fetch(`http://${serverAddress}:3000/peliculas/${peli.id}`, {
    method: 'post',
    // headers: {'Content-Type': 'application/json'}
    headers: {
      'Content-Type': 'application/json',
      'token': getToken()
    },
    body: JSON.stringify({ formulario: peli })
  })
  .then(response => response.json())
  .then(resp => {
    if(resp.id) {
      setModal2(false);
      console.log('Pelicula actualizada exitosamente')
      console.log(resp)
      let pelisCopy = [...pelis];
      pelisCopy[indice] = resp;
      setPelis(pelisCopy);
      if(archivo !== undefined) {
        addImgCall(archivo, resp.id);
      }
    } else if (resp === "Pelicula ya existe") {
      console.log('Pelicula ya existe')
      setModal(true);
    } else {
      console.log("Error al actualizar datos de pelicula en la DB")
      setModal3(true);
    }
  })
  .catch(err => console.log(`Sin conexion al backend: ${err}`))
}

export const addPeliCall = (pelis, setPelis, peli, archivo, setModal3, 
  setModal, setModal2) => {
  fetch(`http://${serverAddress}:3000/peliculas`, {
    method: 'post',
    // headers: {'Content-Type': 'application/json'}
    headers: {
      'Content-Type': 'application/json',
      'token': getToken()
    },
    body: JSON.stringify({ formulario: peli })
  })
  .then(response => response.json())
  .then(peliResp => {
    if(peliResp.id) {
      setModal3(false);
      console.log('Pelicula agregada exitosamente')
      console.log(peliResp)
      setPelis([...pelis, peliResp]);
      if(archivo !== undefined) {
        addImgCall(archivo, peliResp.id);
      }
    } else if (peliResp === "Pelicula ya existe") {
      console.log('Pelicula ya existe')
      setModal(true);
    } else {
      console.log("Error al actualizar datos de pelicula en la DB")
      setModal2(true);
    }
  })
  .catch(err => console.log(`Sin conexion al backend: ${err}`))
}

export const borrarPeliCall = (pelis, setPelis, id, indice, setModal4) => {  
  fetch(`http://${serverAddress}:3000/peliculas/${id}`, {
    method: 'delete',
    // headers: {'Content-Type': 'application/json'}
    headers: {
      'Content-Type': 'application/json',
      'token': getToken()
    }
  })
  .then(response => response.json())
  .then(peliResp => {
    if(peliResp.id) {
      console.log('Pelicula borrada exitosamente')
      let pelisCopy = [...pelis];
      pelisCopy.splice(indice, 1)
      console.log(pelisCopy)
      setPelis([...pelisCopy])
    } else {
      console.log("Error al borrar pelicula de la DB")
      setModal4(true);
    }
  })
  .catch(err => console.log(`Sin conexion al backend: ${err}`))
}

export const addImgCall = (archivo, id) => {
  var formdata = new FormData();
  formdata.append("imagen", archivo);
  fetch(`http://${serverAddress}:3000/upload/${id}`, {
    method: 'post',
    body: formdata,
    headers: {
      // 'Content-Type': 'multipart/form-data',
      'token': getToken()
    }
  })
  .then(response => console.log(response))
  .catch(err => console.log(`Error al cargar imagen: ${err}`))
}

// Con esta funcion traigo la foto de cada pelicula para cada tarjeta
export const retrieveImgCall = (id, setImagenUrl, defaultImg) => {
  fetch(`http://${serverAddress}:3000/imagen/${id}`, {
    method: 'get'
  })
  .then(response => response.blob()) // Blob (Binary Large Object) es un objeto que representa datos binarios crudos, como una imagen, video, o audio.
  .then(imageBlob => {
    // Then create a local URL for that image and print it 
    // console.log(imageBlob, imageBlob.type); // esto es para ver la informacion del objeto que viene del backend, util para el debugging
    if(imageBlob.type === 'image/jpeg') { //Verifica que sea realmente una imagen JPEG
      const imageObjectURL = URL.createObjectURL(imageBlob); // Convierte el Blob en una URL temporal que el navegador puede usar
      setImagenUrl(imageObjectURL); // Esto setea el url si encuentra la imagen requerida y esta en formato de imagen jpeg
    } else {
      setImagenUrl(defaultImg); // De lo contrario retorno una imagen generica provista como parametro de entrada
    }
  })
  .catch(err => console.log(`Sin conexion al backend: ${err}`))
}