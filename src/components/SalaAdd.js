import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { MDBCol } from "mdbreact";
import { addSalaCall } from './ApiCalls.js'

const SalaAdd = ({ salas, setSalas, setModal3 }) => {
  const [sala, setSala] = useState({
    numero: '',
    capacidad: '',
    tipo: ''
  });
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal4, setModal4] = useState(false);

  const cambioInput = (event) => {
    switch (event.target.name) {
      case 'numero':
        setSala({...sala, numero: event.target.value})
        break;
      case 'capacidad':
        setSala({...sala, capacidad: event.target.value})
        break;
      case 'tipo':
        setSala({...sala, tipo: event.target.value})
        break; 
      default:
        console.log("default alcanzado")
        return;
    }
  }
  const agregarSala = () => {
    if(sala.numero === '' || sala.numero < 1 || sala.numero > 9999 ) {
      console.log("Numero de sala invalido");
      setModal4(true);
    } else if(!Number.isInteger(Number(sala.numero))) {
      console.log("Numero de sala decimal");
      setModal4(true);
    } else {
      console.log("Agregar", sala);
      addSalaCall(salas, setSalas, sala, setModal3, setModal, setModal2);
    }
  }
  return(
    <div className='d-flex justify-content-center'>
      <MDBCol md='10'>
      <p>Edite los datos de sala a continuación:</p>
      <form>
        <div className='d-flex'>
        <label className="my-auto mx-2">Número:</label>
        <input name="numero" className="form-control mr-2" placeholder="Numero" onChange={cambioInput}
          type="number" minLength="1" maxLength="4" required value={sala.numero}/>
        </div>
          <br/>
        <div className='d-flex'>
        <label className="my-auto mx-2">Capacidad:</label>
        <input name="capacidad" className="form-control mr-2" placeholder="Capacidad" onChange={cambioInput}
          type="number" maxLength="5" value={sala.capacidad}/>
        </div>
          <br/>
        <div className='d-flex'>
        <label className="my-auto mx-2">Tipo:</label>
        <input name="tipo" className="form-control mr-2" placeholder="Tipo" onChange={cambioInput}
          maxLength="20" value={sala.tipo}/>
        </div>
          <br/>
        <div className="my-4 d-flex" style={{justifyContent:'space-evenly'}}>
          <Button onClick={() => agregarSala()} color="success">Guardar</Button>
          <Button onClick={() => setModal3(false)} color="danger">Cancelar</Button>
        </div>
      </form> 
      </MDBCol>

      <Modal isOpen={modal} toggle={() => setModal(false)} centered>
      <ModalHeader close={<button className="close" onClick={() => setModal(false)}>X</button>}
        toggle={() => setModal(false)}>Mensaje</ModalHeader>
      <ModalBody>
        El número de sala ingresado ya existe. Ingrese otro número de sala.
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => setModal(false)}>Aceptar</Button>
      </ModalFooter>
      </Modal>

      <Modal isOpen={modal2} toggle={() => setModal2(false)} centered>
      <ModalHeader close={<button className="close" onClick={() => setModal2(false)}>X</button>}
        toggle={() => setModal2(false)}>Mensaje</ModalHeader>
      <ModalBody>
        No fue posible realizar agregacion en la DB, contacte al departamento de soporte
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => setModal2(false)}>Aceptar</Button>
      </ModalFooter>
      </Modal>

      <Modal isOpen={modal4} toggle={() => setModal4(false)} centered>
      <ModalHeader close={<button className="close" onClick={() => setModal4(false)}>X</button>}
        toggle={() => setModal4(false)}>Mensaje</ModalHeader>
      <ModalBody>
        Por favor ingrese un número de sala válido
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => setModal4(false)}>Aceptar</Button>
      </ModalFooter>
      </Modal>

    </div>
  )
}

export default SalaAdd;