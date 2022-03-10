import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { MDBJumbotron, MDBCol, MDBCardImage, MDBBadge, MDBRow, MDBBtn } from "mdbreact";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { reservaCall, retrieveImgCall } from './ApiCalls.js'
import defaultImg from '../images/defaultImg.jpg';
import { setearRuta } from '../actions';

const mapStateToProps = (estado) => {
  return {
    estaLogueado: estado.estaLogueado,
    usuario: estado.usuario,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setRuta: (texto) => dispatch(setearRuta(texto)),
  }
}

const PeliculaDetallada = (props) => {
  const { pelicula, estaLogueado, usuario, salas, setRuta } = props;

  const [reserva, setReserva] = useState({
    user_id: '',
    pelicula_id: '',
    sala_id: '',
    hora: ''
  });
  
  const [imagenUrl, setImagenUrl] = useState(undefined);
  useEffect(() => retrieveImgCall(pelicula.id, setImagenUrl, defaultImg), [pelicula.id]);

  const [modal, setModal] = useState(false);
  const toggleModal = () => (setModal(!modal))
  const [modal1, setModal1] = useState(false);
  const toggleModal1 = () => (setModal1(!modal1))
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const cerrarModal3 = () => (setModal3(false));

  const prereserva = (event) => {
    if (estaLogueado) {
      let datos = event.target.value.split("|");
      setReserva({
        user_id: usuario.id,
        pelicula_id: Number(datos[0]),
        sala_id: salas[salaIndex()].numero,
        hora: datos[1]
      })
      toggleModal1()
    }  else {
      toggleModal()
    } 
  }
  const iniciarSesion = () => {
    toggleModal();
    setRuta('signin');
  }
  const reservar = () => {
    console.log(reserva);
    toggleModal1();
    reservaCall(reserva, setModal2, setModal3);
  }

  // Retorna un entero aleatorio entre min (incluido) y max (excluido):
  // Math.floor(Math.random() * (max - min)) + min
  // Genera numero entero aleatorio entre 0 y length: 
  const salaIndex = () => Math.floor(Math.random() * (salas.length))
  
  return (
    <div className='d-flex justify-content-center'>
      <MDBCol md="9" className="border my-3">
        <MDBRow className="bg-info">
        <MDBCol md="4">
          <MDBCardImage style={{ width: "18em" }} className="img-fluid py-3" src={imagenUrl} waves/>
        </MDBCol>
        <MDBCol md="8">
          <MDBJumbotron className="my-3">
            <h1 className="h1 display-5 text-center">{pelicula.titulo}</h1>
            <p>{pelicula.descripcion}</p>
            <hr className="my-2"/>
            <div className='d-flex justify-content-end flex-wrap'>
              <p style={{ fontWeight: "bold", fontSize: '0.9em' }} className="ml-2 my-auto">Duración: </p>
              <MDBBadge className='p-2 mx-1 my-auto' color="light" tag='span'>{pelicula.duracion}</MDBBadge>
              <p style={{ fontWeight: "bold", fontSize: '0.9em' }} className="ml-2 my-auto">Género: </p>
              <MDBBadge className='p-2 mx-1 my-auto' color="light">{pelicula.genero}</MDBBadge>
              <p style={{ fontWeight: "bold", fontSize: '0.9em' }} className="ml-2 my-auto">Horas: </p>
              {pelicula.horas.split("|").map((hora, index)  => {
                return (
                  <MDBBtn size="sm" className='p-2 m-1 font-weight-bold' key={index} 
                    onClick={prereserva} value={pelicula.id+'|'+hora}>{hora}</MDBBtn>
                );
              })}
            </div>
          </MDBJumbotron>
        </MDBCol> 
        </MDBRow>
      </MDBCol>

      <Modal isOpen={modal} toggle={toggleModal}>
      <ModalHeader close={<button className="close" onClick={toggleModal}>X</button>} 
        toggle={toggleModal}>Aviso</ModalHeader>
      <ModalBody>No puede realizar una reserva sin haber iniciado sesión</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={iniciarSesion}>Iniciar Sesión</Button>
        {' '}
        <Button color="danger" onClick={toggleModal}>Cancelar</Button>
      </ModalFooter>
      </Modal>

      <Modal isOpen={modal1} toggle={toggleModal1}>
      <ModalHeader close={<button className="close" onClick={toggleModal1}>X</button>} 
        toggle={toggleModal1}>Confirmación de Reserva</ModalHeader>
      <ModalBody>{usuario.nombre}, desea reservar la pelicula en este horario?</ModalBody>
      <ModalFooter>
        <Button color="success" onClick={reservar}>Reservar</Button>
        {' '}
        <Button color="danger" onClick={toggleModal1}>Cancelar</Button>
      </ModalFooter>
      </Modal>

      <Modal isOpen={modal2} toggle={() => setModal2(false)}>
      <ModalHeader close={<button className="close" onClick={() => setModal2(false)}>X</button>} 
        toggle={() => setModal2(false)}>Mensaje</ModalHeader>
      <ModalBody>Reservación exitosa!</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => setModal2(false)}>Aceptar</Button>
      </ModalFooter>
      </Modal>

      <Modal isOpen={modal3} toggle={cerrarModal3} centered>
        <ModalHeader toggle={cerrarModal3}>Mensaje</ModalHeader>
        <ModalBody>
          No fue posible crear reserva en la DB, contacte al departamento de soporte
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={cerrarModal3}>Aceptar</Button>
        </ModalFooter>
      </Modal>
    </div>
  ); 
}

export default connect(mapStateToProps, mapDispatchToProps)(PeliculaDetallada);
