import React, { useState } from 'react'; // Importo React por el uso de JSX, con react version 17 lo podria borrar, useState es el hook de React 
import { Button } from 'reactstrap'; // otra libreria de bootstrap para react, boton para agregar sala
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; // esto es para traer los pop-up o llamados tambien modales
import { MDBCol } from "mdbreact"; // forma parte de bootstrap para react, para hacer responsiva la visualizacion
import { addSalaCall } from './ApiCalls.js'; //con esta funcion agrego la informacion de la sala a la base de datos

// El setModal3 lo traigo para poder cerrar el modal de 'Agregar Sala' 
const SalaAdd = ({ salas, setSalas, setModal3 }) => {

  // Variable de estado local 'sala' con informacion de la sala que se va a agregar a la base de datos
  const [sala, setSala] = useState({
    numero: '',
    capacidad: '',
    tipo: ''
  });

  const [modal1, setModal1] = useState(false); // modal1 es para mostrar un mensaje de advertencia si el numero de sala ingresado ya existe en la base de datos
  const [modal2, setModal2] = useState(false); // modal2 es para mostrar un mensaje de error si no se pudo agregar la sala a la base de datos 
  const [modal4, setModal4] = useState(false); // este modal4 es para validar que el número de sala no venga en blanco

  // Funcion para actualizar la variable de estado local 'sala' cuando el usuario escribe en los campos del formulario
  const cambioInput = (event) => {
    switch (event.target.name) {
      // Actualiza el numero de sala, que puede ser un texto de hasta 5 caracteres
      case 'numero':
        setSala({...sala, numero: event.target.value.trim()})
        break;
      // Actualiza la capacidad de la sala, que puede ser un numero de hasta 5 digitos
      case 'capacidad':
        setSala({...sala, capacidad: event.target.value})
        break;
      // Actualiza el tipo de sala, que puede ser un texto de hasta 20 caracteres
      case 'tipo':
        setSala({...sala, tipo: event.target.value})
        break; 
      // Si no es ninguno de los casos anteriores no hace nada, en teoria no se deberia llegar aqui en ningun caso
      default:
        console.log("Default alcanzado, error!") // Se debe borrar al final
        return;
    }
  }

  // Funcion para agregar una nueva sala a la base de datos
  const agregarSala = () => {
    // Como estoy pasando de un numero de sala en tipo texto, toda esta funcion de validacion de numero de sala (para que sea un entero entre 1 y 9999)
    // pierde sentido, la dejo en comentario solamente para referencia futura
    /*if(sala.numero === '' || sala.numero < 1 || sala.numero > 9999 ) {
      console.log("Numero de sala invalido");
      setModal4(true);
    } else if(!Number.isInteger(Number(sala.numero))) {
      console.log("Numero de sala decimal");
      setModal4(true);
    } else {
      console.log("Agregar", sala);
      addSalaCall(salas, setSalas, sala, setModal3, setModal, setModal2);
    }*/

    // Validacion de numero de sala para que no venga en blanco, ya que ahora es un texto y puede venir vacio
    if(sala.numero.trim() === '' ) { 
      console.log("Numero de sala invalido"); // Se debe borrar al final
      setModal4(true);
    } else {  
      console.log("Agregar", sala); // Se debe borrar al final
      addSalaCall(salas, setSalas, sala, setModal3, setModal1, setModal2);
    }
  }

  return(
    // Esta sera la pantalla para agregar una sala, es un modal que se abre desde la pantalla Salas.js
    <div className='d-flex justify-content-center'>
      <MDBCol md='10'>
      <p>Llene los datos de sala a continuación:</p>
      <form>

        {/* Numero de Sala (Lo estoy llevando a que sea un texto de maximo 5 caracteres) */}
        <div className='d-flex'>
        <label className="my-auto mx-2">Número:</label>
        {/*<input name="numero" className="form-control mr-2" placeholder="Numero" onChange={cambioInput}
          type="number" minLength="1" maxLength="4" required value={sala.numero}/>
          Voy a cambiar lo anterior por lo siguiente, para hacer q numero de sala sea un texto*/}
        <input name="numero" className="form-control mr-2" placeholder="Numero" onChange={cambioInput}
          minLength="1" maxLength="5" required value={sala.numero}/>
        </div>
        <br/>

        {/* Capacidad de la Sala (es el numero de personas de la sala, debe ser un entero de maximo 5 digitos) */}
        <div className='d-flex'>
        <label className="my-auto mx-2">Capacidad:</label>
        <input name="capacidad" className="form-control mr-2" placeholder="Capacidad" onChange={cambioInput}
          type="number" maxLength="5" value={sala.capacidad}/>
        </div>
        <br/>

        {/* Tipo de Sala (es un texto de maximo 20 caracteres) */}
        <div className='d-flex'>
        <label className="my-auto mx-2">Tipo:</label>
        <input name="tipo" className="form-control mr-2" placeholder="Tipo" onChange={cambioInput}
          maxLength="20" value={sala.tipo}/>
        </div>
        <br/>
        
        {/* Botones para guardar la nueva sala en la base de datos, y boton para cancelar la operacion de agregar sala, el modal3 cierra la ventana para agregar sala */}
        <div className="my-4 d-flex" style={{justifyContent:'space-evenly'}}>
          <Button onClick={() => agregarSala()} color="success">Guardar</Button>
          <Button onClick={() => setModal3(false)} color="danger">Cancelar</Button>
        </div>

      </form> 
      </MDBCol>

      {/* Este modal1 es para mostrar un mensaje de error si el numero de sala ingresado ya existe en la base de datos */}
      <Modal isOpen={modal1} toggle={() => setModal1(false)} centered>
      <ModalHeader close={<button className="close" onClick={() => setModal1(false)}>X</button>}
        toggle={() => setModal1(false)}>Mensaje</ModalHeader>
      <ModalBody>
        El número de sala ingresado ya existe. Por favor ingrese un número de sala diferente.
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => setModal1(false)}>Aceptar</Button>
      </ModalFooter>
      </Modal>

      {/* Este modal2 es para mostrar un mensaje de error si no se pudo agregar la sala a la base de datos, por ejemplo si el backend esta caido o no responde */}
      <Modal isOpen={modal2} toggle={() => setModal2(false)} centered>
      <ModalHeader close={<button className="close" onClick={() => setModal2(false)}>X</button>}
        toggle={() => setModal2(false)}>Mensaje</ModalHeader>
      <ModalBody>
        No fue posible agregar la sala en la Base de Datos, contacte al departamento de soporte.
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => setModal2(false)}>Aceptar</Button>
      </ModalFooter>
      </Modal>

      {/* Este modal4 valida que el número de sala no venga en blanco */}
      <Modal isOpen={modal4} toggle={() => setModal4(false)} centered>
      <ModalHeader close={<button className="close" onClick={() => setModal4(false)}>X</button>}
        toggle={() => setModal4(false)}>Mensaje</ModalHeader>
      <ModalBody>
        Por favor ingrese un número de sala válido.
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => setModal4(false)}>Aceptar</Button>
      </ModalFooter>
      </Modal>

    </div>
  )
}

export default SalaAdd;