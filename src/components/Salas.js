import React, { useState, useEffect, Suspense } from 'react';
import { MDBCol, MDBIcon } from "mdbreact";
import { Table, Button, UncontrolledTooltip } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { salasCall, borrarSalaCall } from './ApiCalls.js'
import './Signin.css'

// import SalaEdit from './SalaEdit';
// import SalaAdd from './SalaAdd';
const SalaEdit = React.lazy(() => import('./SalaEdit'))
const SalaAdd = React.lazy(() => import('./SalaAdd'))

const Salas = () => {
  const [indice, setIndice] = useState('');
  const [salas, setSalas] = useState([]);
  useEffect(() => salasCall(setSalas), []);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modal4, setModal4] = useState(false);
  const [numeroSala, setNumeroSala] = useState('');

  const editarSala = (event) => {
    console.log(salas)
    setIndice(event.target.id)
    setModal2(true);
  }

  const preborrado = (event) => {
    console.log(salas)
    setIndice(event.target.id)
    setNumeroSala(salas[event.target.id].numero)
    setModal1(true)
  }

  const borrarSala = () => {
    borrarSalaCall(salas, setSalas, salas[indice].id, indice, setModal4);
    setModal1(false)
  }

  const agregarSala = () => {
    console.log(salas)
    setModal3(true);
  }

  return (
    <div className="d-flex justify-content-center">
      <MDBCol md='6'>
        <h1 className="h3 bg-info text-white mt-5 py-2 shadow text-center">Administrar Salas</h1>
        <div className="text-right">
          <MDBIcon icon="plus" size='2x' className="green-text enlace-icono" id="Tooltip" onClick={agregarSala}/>
          <UncontrolledTooltip flip target="Tooltip">
            Agregar Sala
          </UncontrolledTooltip>
        </div>
        <Table bordered>
          <thead>
            <tr className="text-center bg-light">
              <th>Sala</th>
              <th>Capacidad</th>
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {salas.map((item, index)  => {
              return (
                <tr key={index} className="text-center">
                  <td>{item.numero}</td>
                  <td>{item.capacidad} personas</td>
                  <td>{item.tipo}</td>
                  <td>
                    <div className="d-flex" style={{justifyContent:'space-evenly'}}>
                      <a href="!#" className='blue-text enlace' onClick={editarSala} id={index}>Editar</a>
                      <a href="!#" className='blue-text enlace' onClick={preborrado} id={index}>Borrar</a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </MDBCol>

      <Modal isOpen={modal1} toggle={() => setModal1(false)} centered>
        <ModalHeader close={<button className="close" onClick={() =>setModal1(false)}>X</button>} 
          toggle={() =>setModal1(false)}>Mensaje</ModalHeader>
        <ModalBody>
          Está seguro que desea eliminar la sala <strong>{numeroSala}</strong> de la base de datos?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={borrarSala}>Sí</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modal2} toggle={() =>setModal2(false)} centered>
        <ModalHeader close={<button className="close" onClick={() =>setModal2(false)}>X</button>} 
          toggle={() =>setModal2(false)}>Editar Sala</ModalHeader>
        <ModalBody>
          <Suspense fallback={<h1 className="text-center mt-5">Cargando...</h1>}>
            <SalaEdit salas={salas} indice={indice} setSalas={setSalas} setModal2={setModal2}/>
          </Suspense>
        </ModalBody>
      </Modal>

      <Modal isOpen={modal3} toggle={() =>setModal3(false)} centered>
        <ModalHeader close={<button className="close" onClick={() =>setModal3(false)}>X</button>} 
          toggle={() =>setModal3(false)}>Agregar Sala</ModalHeader>
        <ModalBody>
          <Suspense fallback={<h1 className="text-center mt-5">Cargando...</h1>}>
            <SalaAdd salas={salas} setSalas={setSalas} setModal3={setModal3}/>
          </Suspense>
        </ModalBody>
      </Modal>

      <Modal isOpen={modal4} toggle={() =>setModal4(false)} centered>
      <ModalHeader close={<button className="close" onClick={() =>setModal4(false)}>X</button>}
        toggle={() =>setModal4(false)}>Mensaje</ModalHeader>
      <ModalBody>
        No fue posible realizar borrado de sala en la DB, contacte al departamento de soporte
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() =>setModal4(false)}>Aceptar</Button>
      </ModalFooter>
      </Modal>

		</div>
  );
}

export default Salas;