import React, { useState } from 'react';
import { MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { esValidNombre, esValidCedula, esValidEmail, esValidContrasena } from './Validacion.js'
import { registerCall } from './ApiCalls.js'
import './Register.css';

const Register = ({ setRuta, setUsuario, setEstaLogueado, setEsAdmin }) => {
  
  const [user, setUser] = useState({
    nombre: '',
    cedula: '',
    celular: '',
    email: '',
    contrasena: ''
  });
  const [contrasena_rep, setContrasena_rep] = useState('');
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(false);
    setEstaLogueado(true);
    setRuta('peliculas');
  }
  const [modal1, setModal1] = useState(false);
  const cerrarModal1 = () => (setModal1(false));
  const [modal2, setModal2] = useState(false);
  const cerrarModal2 = () => (setModal2(false));
  const [modal3, setModal3] = useState(false);
  const cerrarModal3 = () => (setModal3(false));
  const [modal4, setModal4] = useState(false);
  const cerrarModal4 = () => (setModal4(false));

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
        setUser({...user, email: event.target.value.toLowerCase()})
        break; 
      case 'contrasena':
        setUser({...user, contrasena: event.target.value})
        break; 
      case 'contrasena_rep':
        setContrasena_rep(event.target.value)
        break; 
      default:
        console.log("default alcanzado")
        return;
    }
  }
  const registrar = () => {
    if(contrasena_rep !== user.contrasena) {
      console.log("Las contraseñas no coinciden");
      setModal4(true);
    } else if(esValidNombre(user.nombre) && esValidCedula(user.cedula) && 
      esValidEmail(user.email) && esValidContrasena(user.contrasena)) {
        registerCall(user, setUsuario, setModal, setModal2, setModal3, setEsAdmin);
    } else {
      console.log("Los datos ingresados no cumplen la validación");
      setModal1(true);
    }
  }
  const submitHandler = (event) => {
      event.preventDefault();
      event.target.className += " was-validated";
  }
  return (
    <div className='d-flex justify-content-center'>
      <MDBCol md="4" className='d-flex justify-content-center border my-5 registro'>
        <MDBCol md="10" className='my-5'>
          <h1 className="h3 bg-secondary text-white py-2 shadow text-center mb-5">REGISTRESE</h1>
          <form onSubmit={submitHandler} noValidate>
            <div className="pb-1 grey-text">
              <MDBInput name="nombre" label="Escriba su nombre aquí" icon="user" minLength="1" maxLength="90"
                required onChange={cambioInput}>
                  <div className="invalid-tooltip">Debe ingresar su nombre</div>
              </MDBInput>
            </div>
            <div className="pb-1 grey-text">
              <MDBInput name="cedula" label="Digite su número de cédula aquí" icon="id-card" minLength='1' 
                maxLength="15" type="number" required onChange={cambioInput}>
                  <div className="invalid-tooltip">Debe ingresar su número de cédula (solo números)</div>
              </MDBInput>
            </div>
            <div className="pb-1 grey-text">
              <MDBInput name="celular" label="Digite su número de teléfono celular aquí" icon="mobile-alt" 
              type="tel" maxLength="20" onChange={cambioInput}/>
            </div>
            <div className="pb-1 grey-text">
              <MDBInput name="email" label="Escriba su correo electrónico aquí" icon="envelope" type="email" 
                maxLength="100" required pattern="[a-z0-9._%+-]+@[a-z0-9-.]+\.[a-z]{2,}$"
                onChange={cambioInput}>
                  <div className="invalid-tooltip">Ingrese un correo electrónico válido</div>
              </MDBInput>
            </div>
            <div className="pb-1 grey-text">
              <MDBInput name="contrasena" label="Escriba su contraseña aquí" icon="lock" type="password" 
                required minLength="5" maxLength="20" onChange={cambioInput}>
                  <div className="invalid-tooltip">La contraseña debe contener al menos 5 caracteres</div>
              </MDBInput>
            </div>
            <div className="pb-1 grey-text">
              <MDBInput name="contrasena_rep" label="Confirme su contraseña aquí" icon="lock" type="password" 
                required minLength="5" maxLength="20" onChange={cambioInput}>
                  <div className="invalid-tooltip">La contraseña debe contener al menos 5 caracteres</div>
              </MDBInput>
            </div>
            {/* Terminos y condiciones
            <div className="md-form pb-4">
              <div className='form-check my-4'>
              <MDBInput name="terminos" type="checkbox" minLength="5" maxLength="20" onChange={cambioInput}
                label={<p className="grey-text">Estoy de acuerdo con <a href='!#' className='blue-text'>los términos y condiciones</a></p>}
                />
              </div>
            </div>   */}
            <div className="text-center pt-2">
              <MDBBtn rounded gradient="purple" type='submit' onClick={registrar}>Registrar</MDBBtn>
            </div>
          </form>
          <p className='text-center p-3'>¿Ya tiene una cuenta?
          <span onClick={() => setRuta('signin')} className="dark-grey-text font-weight-bold enlace"> 
            &nbsp;¡Inicie sesión!
          </span>
        </p>
        </MDBCol>
      </MDBCol>

      <Modal isOpen={modal} toggle={toggleModal} centered>
        <ModalHeader close={<button className="close" onClick={toggleModal}>X</button>}
          toggle={toggleModal}>Mensaje</ModalHeader>
        <ModalBody>
          Registro exitoso!
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>Aceptar</Button>
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
          No fue posible crear usuario en la DB, contacte al departamento de soporte
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

      <Modal isOpen={modal4} toggle={cerrarModal4} centered>
        <ModalHeader close={<button className="close" onClick={cerrarModal4}>X</button>}
          toggle={cerrarModal4}>Mensaje</ModalHeader>
        <ModalBody>
          Las contraseñas ingresadas deben coincidir.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={cerrarModal4}>Aceptar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Register;