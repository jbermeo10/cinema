import React, { useState, useEffect, Suspense } from 'react'; // Importo React por el uso de JSX, con react version 17 lo podria borrar, useEffect y useState son hooks de React 
import { MDBCol, MDBIcon } from "mdbreact"; // forma parte de bootstrap para react, para hacer responsiva la visualizacion
import { Table, Button, UncontrolledTooltip } from 'reactstrap'; // otra libreria de bootstrap para react, para presentar datos en una tabla, botones y tooltip para agregar sala
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; // esto es para traer los pop-up o llamados tambien modales
import { salasCall, borrarSalaCall } from './ApiCalls.js'; // con estas funciones traigo la informacion de las salas de la base de datos para mostrarla en el frontend, 
// y tambien tengo una funcion para borrar salas de la base de datos
import './Signin.css'; // de aca traigo codigo CSS de lo sgte: inisesion (no veo q se use), enlace, enlace-icono

// import SalaEdit from './SalaEdit'; // Asi lo tenia al inicio
// import SalaAdd from './SalaAdd'; 

// Las 2 posibles pantallas SalaEdit y SalaAdd (ambos son modales) se cargan solo si son llamadas para hacer mas rapida la carga de la pantalla Salas, se usa funcion react.lazy 
const SalaEdit = React.lazy(() => import('./SalaEdit'))
const SalaAdd = React.lazy(() => import('./SalaAdd'))

const Salas = () => {
  const [indice, setIndice] = useState('');  // variable de estado local 'indice' para saber que sala estoy editando o borrando, es un numero entero que indica el campo id  
  // de la sala en el arreglo de salas

  const [salas, setSalas] = useState([]); // variable de estado local 'salas' con informacion de todas las salas de la base de datos
  useEffect(() => salasCall(setSalas), []); // hook asincrono para actualizar la variable de estado local 'salas'

  const [modal1, setModal1] = useState(false); // Modal1 es para confirmar si se desea borrar la sala
  const [modal2, setModal2] = useState(false); // Modal2 es para editar sala
  const [modal3, setModal3] = useState(false); // Modal3 es para agregar sala
  const [modal4, setModal4] = useState(false); // Modal4 es para mostrar un mensaje de error en caso no se pueda borrar la sala de la DB
  const [nombreSala, setNombreSala] = useState(''); // variable de estado local 'nombreSala' para almacenar el nombre de la sala (al momento son numeros) a borrar en el modal1

  const editarSala = (event) => {
    // console.log(salas); // Visualiza el arreglo de salas en la consola del navegador, util durante el debugging
    setIndice(Number(event.target.id)); // event.target es el elemento <a/> que se clickeo, event.target.id es el valor de 'id' en ese elemento, que seria el valor de 'item.id',
    //  esto es, la posicion de la sala en el arreglo de salas
    setModal2(true); // Esto abre el modal2 para editar la sala
  }

  const preborrado = (event) => {  
    // console.log(salas); // Visualiza el arreglo de salas en la consola del navegador, util durante el debugging
    setIndice(Number(event.target.id)); // event.target es el elemento <a/> que se clickeo, event.target.id es el valor de 'id' en ese elemento, que seria el valor de 'item.id',
    //  esto es, la posicion de la sala en el arreglo de salas
    //console.log(event.target.id) 
    let salaEncontrada = salas.find(sala => sala.id === Number(event.target.id)); // Esto busca la sala en el arreglo de salas que tenga el mismo id que el id del elemento <a/> clickeado
    //console.log(salaEncontrada) 
    setNombreSala(salaEncontrada.numero) // Esto almacena el nombre de la sala a borrar para mostrarse en el modal1
    setModal1(true); // Esto abre el modal1 para confirmar si se desea borrar la sala, y muestra el nombre de la sala a borrar 
  }

  const borrarSala = () => {
    let salaEncontrada = salas.find(sala => sala.id === indice)
    borrarSalaCall(salas, setSalas, salaEncontrada.id, indice, setModal4); // Esto llama a la funcion borrarSalaCall que borra la sala de forma definitiva de la base de datos, 
    // y actualiza el arreglo de salas, el Modal4 es para mostrar un mensaje de error en caso no se pueda borrar la sala de la DB
    setModal1(false) // Esto cierra el modal1 para confirmar si se desea borrar la sala, y muestra el nombre de la sala a borrar
  }

  const agregarSala = () => {
    // console.log(salas); // Visualiza el arreglo de salas en la consola del navegador, util durante el debugging
    setModal3(true); // Esto abre el modal3 para agregar una sala
  }

  return (
    <div className="d-flex justify-content-center">
      <MDBCol md='6'>
        {/* Este es el titulo de la pantalla Admisnitrar Salas */}
        <h1 className="h3 bg-info text-white mt-5 py-2 shadow text-center">Administrar Salas</h1>
        {/* Este es el boton en forma de + para agregar una sala */}
        <div className="text-right">
          {/* Al dar clic en el boton + (plus) se abre el modal3 para agregar una sala */}
          <MDBIcon icon="plus" size='2x' className="green-text enlace-icono" id="Tooltip" onClick={agregarSala}/>
          {/* Tooltip para saber que el boton sirve para agregar sala */}
          <UncontrolledTooltip flip target="Tooltip">
            Agregar Sala
          </UncontrolledTooltip>
        </div>

        {/* Tabla para mostrar las salas cargadas de la base de datos*/}
        <Table bordered size="sm">
          {/* Estos son los titulos de las 4 columnas de la tabla */}
          <thead>
            <tr className="text-center bg-light">
              <th>Sala</th>
              <th>Capacidad</th>
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>
          </thead>

          {/* Aqui se despliegan los datos de todas las salas en el cuerpo de la tabla
          Pase de "salas.map((item, index)" a "salas.map((item)" por consejo de Claude */}
          <tbody>
            {salas.map((item)  => {
              return (
                /*<tr key={index} className="text-center"> // borrado y reemplazado con la linea de abajo por consejo de Claude*/
                <tr key={item.id} className="text-center">
                  {/* Aqui se carga la info de cada una de las salas: numero (no necesariamente un numero, puede ser texto), capacidad, tipo*/}
                  <td>{item.numero}</td>
                  <td>{item.capacidad} personas</td>
                  <td>{item.tipo}</td>
                  <td>
                    {/* Aqui se cargan los 2 enlaces para editar o confirmar borrado de la sala de esa linea*, href="!#" es para que el texto 'Editar' y 'Borrar' luzca como enlace*/}
                    <div className="d-flex" style={{justifyContent:'space-evenly'}}>
                      {/* Aqui cambie 'id={index}' por 'id={item.id}'*/}
                      <a href="!#" className='blue-text enlace' onClick={editarSala} id={item.id}>Editar</a>
                      <a href="!#" className='blue-text enlace' onClick={preborrado} id={item.id}>Borrar</a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </MDBCol>

      {/* Modal1 para confirmar borrado de la sala */}
      <Modal isOpen={modal1} toggle={() => setModal1(false)} centered>
        <ModalHeader close={<button className="close" onClick={() =>setModal1(false)}>X</button>} 
          toggle={() =>setModal1(false)}>Mensaje</ModalHeader>
        {/*Aqui el modal1 presenta el nombre de la sala a borrar, que es el valor de la variable de estado local 'nombreSala'*/}
        <ModalBody>
          Está seguro que desea eliminar la sala <strong>{nombreSala}</strong> de la base de datos?
        </ModalBody>
        {/* Con este boton se llama a la funcion 'borrarSala' que borra la sala de forma definitiva*/}
        <ModalFooter>
          <Button color="primary" onClick={borrarSala}>Sí</Button>
        </ModalFooter>
      </Modal>
      
      {/* Modal2 para editar la sala */}
      <Modal isOpen={modal2} toggle={() =>setModal2(false)} centered>
        <ModalHeader close={<button className="close" onClick={() =>setModal2(false)}>X</button>} 
          toggle={() =>setModal2(false)}>Editar Sala</ModalHeader>
        <ModalBody>
          {/* Aqui uso 'Suspense' porque el componente SalaEdit es un componente React.lazy, importado de un archivo .js */}
          <Suspense fallback={<h1 className="text-center mt-5">Cargando...</h1>}>
            <SalaEdit salas={salas} indice={indice} setSalas={setSalas} setModal2={setModal2}/>
          </Suspense>
        </ModalBody>
      </Modal>

      {/* Modal3 para agregar la sala */}
      <Modal isOpen={modal3} toggle={() =>setModal3(false)} centered>
        <ModalHeader close={<button className="close" onClick={() =>setModal3(false)}>X</button>} 
          toggle={() =>setModal3(false)}>Agregar Sala</ModalHeader>
        <ModalBody>
          {/* Aqui uso 'Suspense' porque el componente SalaAdd es un componente React.lazy, importado de un archivo .js */}
          <Suspense fallback={<h1 className="text-center mt-5">Cargando...</h1>}>
            <SalaAdd salas={salas} setSalas={setSalas} setModal3={setModal3}/>
          </Suspense>
        </ModalBody>
      </Modal>

      {/* Modal4 para mostrar un mensaje de error en caso no se pueda borrar la sala de la DB */} 
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