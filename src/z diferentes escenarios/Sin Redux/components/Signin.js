import React, { useState } from 'react';
import { MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { signinCall } from './ApiCalls.js'
import './Signin.css'

const Signin = ({ setRuta, setEstaLogueado, setUsuario, setEsAdmin }) => {

	const [signInEmail, setSignInEmail] = useState('');
  const onEmailChange = (event) => (setSignInEmail(event.target.value))
  const [signInContrasena, setSignInContrasena] = useState('');
	const onContrasenaChange = (event) => (setSignInContrasena(event.target.value))
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(false);
    setEstaLogueado(true);
    setRuta('peliculas');
  }
  const [modal1, setModal1] = useState(false);
  const toggleModal1 = () => (setModal1(!modal1))
  const [modal2, setModal2] = useState(false);
  const toggleModal2 = () => (setModal2(!modal2))
  const [modal3, setModal3] = useState(false);
  const toggleModal3 = () => (setModal3(!modal3))

  const iniciarSesion = () => {
    if(signInEmail=== '' || signInContrasena===''){
      console.log("No se ha ingresado correo y/o contrasena")
    } else {
      signinCall(signInEmail.toLowerCase(), signInContrasena, setUsuario, setModal, setModal1, setModal2, 
        setModal3, setEsAdmin)
    } 
  }
  const submitHandler = (event) => {
    event.preventDefault();
    event.target.className += " was-validated";
  }
  return (
    <div className='d-flex justify-content-center'>
      <MDBCol md='4' className='d-flex justify-content-center border my-5 inisesion'>
      <MDBCol md="10" className='my-5'>
        <h1 className="h3 bg-warning text-white py-2 shadow text-center mb-5">INGRESE A CINEMA</h1>
        <form onSubmit={submitHandler} noValidate>
          <div className="pb-1 grey-text">
            <MDBInput label="Escriba su correo electrónico" icon="envelope" type="email" 
              minLength="11" maxLength="100" required onChange={onEmailChange}>
                <div className="invalid-tooltip">Ingrese un correo electrónico</div>
            </MDBInput>
          </div>
          <div className="pb-1 grey-text">
            <MDBInput label="Escriba su contraseña" icon="lock" type="password" required
              minLength="5" maxLength="20" onChange={onContrasenaChange}>
                <div className="invalid-tooltip">Ingrese una contraseña</div>
            </MDBInput>
          </div>
          <div className="text-center">
            <MDBBtn gradient="peach" type='submit' onClick={iniciarSesion}>Ingresar</MDBBtn>
          </div>
        </form>
        <p className='text-center p-3'>Si usted aún no es usuario,
          <span onClick={() => setRuta('register')} className="dark-grey-text font-weight-bold enlace">
            &nbsp;regístrese aquí!
          </span>
        </p>
      </MDBCol>
      </MDBCol>

      <Modal isOpen={modal} toggle={toggleModal} centered>
        <ModalHeader close={<button className="close" onClick={toggleModal}>X</button>}
          toggle={toggleModal}>Mensaje</ModalHeader>
        <ModalBody>
          Ingreso exitoso!
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>Aceptar</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modal1} toggle={toggleModal1} centered>
        <ModalHeader close={<button className="close" onClick={toggleModal1}>X</button>}
          toggle={toggleModal1}>Mensaje</ModalHeader>
        <ModalBody>
          Contraseña incorrecta
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal1}>Aceptar</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modal2} toggle={toggleModal2} centered>
        <ModalHeader close={<button className="close" onClick={toggleModal2}>X</button>}
          toggle={toggleModal2}>Mensaje</ModalHeader>
        <ModalBody>
          Usuario no registrado
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal2}>Aceptar</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modal3} toggle={toggleModal3} centered>
        <ModalHeader close={<button className="close" onClick={toggleModal3}>X</button>}
          toggle={toggleModal3}>Mensaje</ModalHeader>
        <ModalBody>
          Falla en la consulta a la DB de usuarios, contacte al departamento de soporte
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal3}>Aceptar</Button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default Signin;