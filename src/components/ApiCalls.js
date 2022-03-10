const serverAddress = "localhost"; // para accederlo desde mi PC
// const serverAddress = "192.168.100.143"; // si deseo que lo accedan en la LAN
// const serverAddress = "ec2-3-142-91-255.us-east-2.compute.amazonaws.com"; // para accederlo desde internet

const getToken = () => window.localStorage.getItem('token');

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
      if(usuario.nombre === 'Administrador') {
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

export const actSalaCall = (salas, indice, setSalas, sala, setModal2, 
  setModal, setModal3) => {  
  fetch(`http://${serverAddress}:3000/salas/${sala.id}`, {
    method: 'post',
    // headers: {'Content-Type': 'application/json'}
    headers: {
      'Content-Type': 'application/json',
      'token': getToken()
    },
    body: JSON.stringify({ formulario: sala })
  })
  .then(response => response.json())
  .then(resp => {
    if(resp === "Actualizacion exitosa") {
      setModal2(false);
      console.log('Sala actualizada exitosamente')
      let salasCopy = [...salas];
      salasCopy[indice] = sala;
      setSalas(salasCopy)
    } else if (resp === "Sala ya existe") {
      console.log('Sala ya existe')
      setModal(true);
    } else {
      console.log("Error al actualizar datos de sala en la DB")
      setModal3(true);
    }
  })
  .catch(err => console.log(`Sin conexion al backend: ${err}`))
}

export const addSalaCall = (salas, setSalas, sala, setModal3, setModal, 
  setModal2) => {  
  fetch(`http://${serverAddress}:3000/salas`, {
    method: 'post',
    // headers: {'Content-Type': 'application/json'}
    headers: {
      'Content-Type': 'application/json',
      'token': getToken()
    },
    body: JSON.stringify({ formulario: sala })
  })
  .then(response => response.json())
  .then(salaResp => {
    if(salaResp.id) {
      setModal3(false);
      console.log('Sala agregada exitosamente')
      setSalas([...salas, sala])
    } else if (salaResp === "Sala ya existe") {
      console.log('Sala ya existe')
      setModal(true);
    } else {
      console.log("Error al actualizar datos de sala en la DB")
      setModal2(true);
    }
  })
  .catch(err => console.log(`Sin conexion al backend: ${err}`))
}

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
      console.log('Sala borrada exitosamente')
      let salasCopy = [...salas];
      salasCopy.splice(indice, 1)
      console.log(salasCopy)
      setSalas([...salasCopy])
    } else {
      console.log("Error al borrar sala de la DB")
      setModal4(true);
    }
  })
  .catch(err => console.log(`Sin conexion al backend: ${err}`))
}

export const peliculasCall = (setPeliculas) => {
  fetch(`http://${serverAddress}:3000/peliculas`, {
    method: 'get',
    headers: {'Content-Type': 'application/json'}
  })
  .then(response => response.json())
  .then(dbPeliculas => {
    if (dbPeliculas.length) {
      // console.log(dbPeliculas);
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
  .catch(err => console.log(`Sin conexion al backend: ${err}`))
}

export const retrieveImgCall = (id, setImagenUrl, defaultImg) => {
  fetch(`http://${serverAddress}:3000/imagen/${id}`, {
    method: 'get'
  })
  .then(response => response.blob())
  .then(imageBlob => {
    // Then create a local URL for that image and print it 
    // console.log(imageBlob, imageBlob.type);
    if(imageBlob.type === 'image/jpeg') {
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImagenUrl(imageObjectURL);
    } else {
      setImagenUrl(defaultImg);
    }
  })
  .catch(err => console.log(`Sin conexion al backend: ${err}`))
}