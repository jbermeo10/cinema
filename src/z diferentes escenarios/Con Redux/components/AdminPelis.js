import React, { useState, useEffect, Suspense } from 'react';
import { MDBCol, MDBIcon } from "mdbreact";
import { Table, Button, UncontrolledTooltip } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { peliculasCall, borrarPeliCall } from './ApiCalls.js'
import './Signin.css'

// import PeliEdit from './PeliEdit';
// import PeliAdd from './PeliAdd';
const PeliEdit = React.lazy(() => import('./PeliEdit'))
const PeliAdd = React.lazy(() => import('./PeliAdd'))

const AdminPelis = () => {
  const [indice, setIndice] = useState('');
  const [pelis, setPelis] = useState([]);
  useEffect(() => peliculasCall(setPelis), []);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modal4, setModal4] = useState(false);
  const [tituloPeli, setTituloPeli] = useState('');

  const editarPeli = (event) => {
    console.log(pelis)
    setIndice(event.target.id)
    setModal2(true);
  }

  const preborrado = (event) => {
    console.log(pelis)
    setIndice(event.target.id)
    setTituloPeli(pelis[event.target.id].titulo)
    setModal1(true)
  }

  const borrarPeli = () => {
    borrarPeliCall(pelis, setPelis, pelis[indice].id, indice, setModal4);
    setModal1(false)
  }

  const agregarPeli = () => {
    console.log(pelis)
    setModal3(true);
  }

  return (
    <div className="d-flex justify-content-center">
      <MDBCol md='10'>
        <h1 className="h3 bg-info text-white mt-5 py-2 shadow text-center">Administrar Películas</h1>
        <div className="text-right">
          <MDBIcon icon="plus" size='2x' className="green-text enlace-icono" id="Tooltip"
            onClick={agregarPeli}/>
          <UncontrolledTooltip flip target="Tooltip">
            Agregar Película
          </UncontrolledTooltip>
        </div>
        <Table bordered>
          <thead>
            <tr className="text-center bg-light">
              <th>Fecha de creación</th>
              <th>Título</th>
              {/* <th>Imagen</th> */}
              <th>Descripción</th>
              <th>Duración</th>
              <th>Género</th>
              <th>Horas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pelis.map((item, index)  => {
              return (
                <tr key={index} className="text-center">
                  <td>{new Date(item.fecha).toLocaleDateString()}</td>
                  <td>{item.titulo}</td>
                  {/* <td>{item.imagen}</td> */}
                  <td>{item.descripcion}</td>
                  <td>{item.duracion}</td>
                  <td>{item.genero}</td>
                  <td>{item.horas.split("|").map((hora) => hora + " ")}</td>
                  <td>
                    <div>
                      <a href="!#" className='blue-text enlace' onClick={editarPeli} id={index}>Editar</a>
                      {'  '}
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
          Está seguro que desea eliminar la película <strong>{tituloPeli}</strong> de la base de datos?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={borrarPeli}>Sí</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modal2} toggle={() =>setModal2(false)} size="lg" centered>
        <ModalHeader close={<button className="close" onClick={() =>setModal2(false)}>X</button>} 
          toggle={() =>setModal2(false)}>Editar Película</ModalHeader>
        <ModalBody>
          <Suspense fallback={<h1 className="text-center mt-5">Cargando...</h1>}>
            <PeliEdit pelis={pelis} indice={indice} setPelis={setPelis} setModal2={setModal2}/>
          </Suspense>
        </ModalBody>
      </Modal>

      <Modal isOpen={modal3} toggle={() =>setModal3(false)} size="lg" centered>
        <ModalHeader close={<button className="close" onClick={() =>setModal3(false)}>X</button>} 
          toggle={() =>setModal3(false)}>Agregar Película</ModalHeader>
        <ModalBody>
          <Suspense fallback={<h1 className="text-center mt-5">Cargando...</h1>}>
            <PeliAdd pelis={pelis} setPelis={setPelis} setModal3={setModal3}/>
          </Suspense>
        </ModalBody>
      </Modal>

      <Modal isOpen={modal4} toggle={() =>setModal4(false)} centered>
      <ModalHeader close={<button className="close" onClick={() =>setModal4(false)}>X</button>}
        toggle={() =>setModal4(false)}>Mensaje</ModalHeader>
      <ModalBody>
        No fue posible realizar borrado de película en la DB, contacte al departamento de soporte
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() =>setModal4(false)}>Aceptar</Button>
      </ModalFooter>
      </Modal>

		</div>
  );
}


export default AdminPelis;