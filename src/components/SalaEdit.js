import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { MDBCol } from "mdbreact";
import { actSalaCall } from './ApiCalls.js'

const SalaEdit = ({ salas, indice, setSalas, setModal2 }) => {
  const [sala, setSala] = useState({
    id: salas[indice].id,
    numero: salas[indice].numero,
    capacidad: salas[indice].capacidad,
    tipo: salas[indice].tipo
  });
  const [modal, setModal] = useState(false);
  const [modal3, setModal3] = useState(false);
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
  const actualizarSala = () => {
    console.log("Actualizar", sala);
    actSalaCall(salas, indice, setSalas, sala, setModal2, setModal, setModal3);
  }
  return(
    <div className='d-flex justify-content-center'>
      <MDBCol md='10'>
      <p>Edite los datos de sala a continuación:</p>
      <form>
        <div className='d-flex'>
        <label className="my-auto mx-2">Número:</label>
        <input name="numero" className="form-control mr-2" placeholder="Numero" onChange={cambioInput}
          type="number" minLength="1" maxLength="5" required value={sala.numero}/>
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
          <Button onClick={() => actualizarSala()} color="success">Guardar</Button>
          <Button onClick={() => setModal2(false)} color="danger">Cancelar</Button>
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

      <Modal isOpen={modal3} toggle={() => setModal3(false)} centered>
      <ModalHeader close={<button className="close" onClick={() => setModal3(false)}>X</button>}
        toggle={() => setModal3(false)}>Mensaje</ModalHeader>
      <ModalBody>
        No fue posible realizar actualización en la DB, contacte al departamento de soporte
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => setModal3(false)}>Aceptar</Button>
      </ModalFooter>
      </Modal>

    </div>
  )
}

export default SalaEdit;