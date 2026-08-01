import React, { useState, useEffect, Suspense } from 'react'; // Importo React por el uso de JSX, con react version 17 lo podria borrar, useEffect y useState son hooks de React 
import { MDBCol, MDBIcon } from "mdbreact"; // forma parte de bootstrap para react, para hacer responsiva la visualizacion
import { Table, Button, UncontrolledTooltip } from 'reactstrap'; // otra libreria de bootstrap para react, para presentar datos en una tabla, botones y tooltip para agregar sala
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; // esto es para traer los pop-up o llamados tambien modales
import { peliculasCall, borrarPeliCall } from './ApiCalls.js' // con estas funciones traigo la informacion de las peliculas de la base de datos para mostrarla en el frontend, 
// y tambien tengo una funcion para borrar peliculas de la base de datos
import './Signin.css'; // Esto no lo necesito, creo q lo podria borrar luego, mejor me espero a ver si me da algun error, de momento lo dejo

// import PeliEdit from './PeliEdit'; // Asi lo tenia al inicio
// import PeliAdd from './PeliAdd';

// Las 2 posibles pantallas PeliEdit y PeliAdd (ambos son modales) se cargan solo si son llamadas para hacer mas rapida la carga de la pantalla AdminPelis, se usa funcion react.lazy 
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