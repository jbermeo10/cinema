import React, { useState } from 'react';
import { MDBCol } from "mdbreact";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { esValidNombre, esValidCedula, esValidEmail } from './Validacion.js'
import { actPerfilCall } from './ApiCalls.js'

const Perfil = ({ usuario, setRuta, setUsuario, esAdmin }) => {

  const [user, setUser] = useState({
    nombre: usuario.nombre,
    cedula: usuario.cedula,
    celular: usuario.celular,
    email: usuario.email,
    // contrasena: "%&*$(#@"
  });
  const [modal, setModal] = useState(false);
  const cerrarModal = () => {
    setModal(false);
    setRuta('peliculas');
  }
  const [modal1, setModal1] = useState(false);
  const cerrarModal1 = () => (setModal1(false))
  const [modal2, setModal2] = useState(false);
  const cerrarModal2 = () => (setModal2(false))
  const [modal3, setModal3] = useState(false);
  const cerrarModal3 = () => (setModal3(false));

  const cambioInput = (event) => {
    switch (event.target.name) {
      case 'nombre':
        setUser({...user, nombre: event.target.value})
        break;
      case 'cedula':
        setUser({...user, cedula: event.target.value})
        break;
      case 'celular':
        setUser({...user, celular: event.target.value})
        break; 
      case 'email':
        setUser({...user, email: event.target.value})
        break; 
      // case 'contrasena':
      //   setUser({...user, contrasena: event.target.value})
      //   break; 
      default:
        console.log("default alcanzado")
        return;
    }
  }
  const actualizarPerfil = () => {
    if(esAdmin){
      if(esValidNombre(user.nombre) && esValidCedula(user.cedula)) {
        actPerfilCall(user, setModal, setModal2, setModal3, usuario, setUsuario);
      }
    } else {
      if(esValidNombre(user.nombre) && esValidCedula(user.cedula) && esValidEmail(user.email)) {
          actPerfilCall(user, setModal, setModal2, setModal3, usuario, setUsuario);
      } else {
        console.log("Los datos ingresados no cumplen la validación")
        setModal1(true);
      }
    }
  }
  const submitHandler = (event) => {
    event.preventDefault();
    event.target.className += " was-validated";
  }
  return (
    <div className='d-flex justify-content-center'>
    <MDBCol md='4'>
      <h1 className="h3 bg-info text-white mt-4 mb-3 py-2 shadow text-center">PERFIL DE USUARIO</h1>
      <div className='px-4 border' style={{backgroundColor:'rgba(206,234,235,1)'}}>
        <h3 className="mt-4">Hola {usuario.nombre}</h3>
        <p>{`Es miembro desde: ${new Date(usuario.joined).toLocaleDateString()}`}</p>
        <hr/>
        <p>Edite sus datos a continuación:</p>
        <form onSubmit={submitHandler} noValidate>
          <div className='d-flex'>
            <label className="my-auto mx-2">Nombre:</label>
            <input name="nombre" className="form-control mr-2" placeholder="Nombre" onChange={cambioInput}
              minLength="1" maxLength="90" required value={user.nombre}/>
          </div>
            <br/>
          <div className='d-flex'>
            <label className="my-auto mx-2">Cédula:</label>
            <input name="cedula" className="form-control mr-2" placeholder="Cédula" onChange={cambioInput}
              minLength='1' maxLength="15" type="number" required value={user.cedula}/>
          </div>
            <br/>
          <div className='d-flex'>
            <label className="my-auto mx-2">Celular:</label>
            <input name="celular" className="form-control mr-2" placeholder="Celular" onChange={cambioInput}
              type="tel" maxLength="20" value={user.celular}/>
          </div>
            <br/>
          <div className='d-flex'>
            <label className="my-auto mx-2">Email:</label>
            <input name="email" className="form-control mr-2" placeholder="Correo electrónico" 
              onChange={cambioInput} maxLength="100" required type="email" value={user.email}
              pattern="[a-z0-9._%+-]+@[a-z0-9-.]+\.[a-z]{2,}$"/>
          </div>
            <br/>
          {/* <div className='d-flex'>
          <label className="my-auto mx-2">Contraseña:</label>
          <input name="contrasena" className="form-control mr-2" onChange={cambioInput}
            minLength="5" maxLength="20" required type="password" value={user.contrasena}/>
            <br/>
          </div> */}
          <div className="my-4 d-flex" style={{justifyContent:'space-evenly'}}>
            <Button type='submit' onClick={() => actualizarPerfil()} color="success">Guardar</Button>
            <Button type='submit' onClick={() => setRuta('peliculas')} color="danger">Cancelar</Button>
          </div>
        </form> 
      </div>
    </MDBCol>

    <Modal isOpen={modal} toggle={cerrarModal} centered>
      <ModalHeader close={<button className="close" onClick={cerrarModal}>X</button>}
        toggle={cerrarModal}>Mensaje</ModalHeader>
      <ModalBody>
        Actualización exitosa!
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={cerrarModal}>Aceptar</Button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={modal1} toggle={cerrarModal1} centered>
      <ModalHeader close={<button className="close" onClick={cerrarModal1}>X</button>}
        toggle={cerrarModal1}>Mensaje</ModalHeader>
      <ModalBody>
        Corrija los datos que presentan error de validación
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={cerrarModal1}>Aceptar</Button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={modal2} toggle={cerrarModal2} centered>
      <ModalHeader close={<button className="close" onClick={cerrarModal2}>X</button>}
        toggle={cerrarModal2}>Mensaje</ModalHeader>
      <ModalBody>
        No fue posible realizar actualización en la DB, contacte al departamento de soporte
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={cerrarModal2}>Aceptar</Button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={modal3} toggle={cerrarModal3} centered>
      <ModalHeader close={<button className="close" onClick={cerrarModal3}>X</button>}
        toggle={cerrarModal3}>Mensaje</ModalHeader>
      <ModalBody>
        El correo electrónico ingresado ya ha sido registrado por otro usuario. 
        Ingrese otra dirección de correo electrónico.
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={cerrarModal3}>Aceptar</Button>
      </ModalFooter>
    </Modal>

    </div>
  );
}

export default Perfil;