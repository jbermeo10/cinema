import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { MDBCol } from "mdbreact";
import { actSalaCall } from './ApiCalls.js'

// El setModal2 lo traigo para poder cerrar el modal de 'Editar Sala' 
const SalaEdit = ({ salas, indice, setSalas, setModal2 }) => {

  // Variable de estado local 'sala' con informacion de la sala que se va a editar en la base de datos
  const salaActual = salas.find(sala => sala.id === Number(indice))
  const [sala, setSala] = useState(salaActual)
    // Codigo eliminado por Claude y sustituido por lo de arriba
    // {id: salas[indice].id,
    // numero: salas[indice].numero,
    // capacidad: salas[indice].capacidad,
    // tipo: salas[indice].tipo});

  const [modal1, setModal1] = useState(false); // modal1 es para mostrar un mensaje de advertencia si el numero de sala ingresado ya existe en la base de datos
  const [modal3, setModal3] = useState(false); // modal3 es para mostrar un mensaje de error si no se pudo editar la sala en la base de datos
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

  // Funcion para editar una sala en la base de datos
  const actualizarSala = () => {
    if(sala.numero.trim() === '' ) {
      console.log("El número de sala es requerido"); // Se debe borrar al final
      setModal4(true); // modal4 es para mostrar un mensaje de advertencia si el numero de sala ingresado viene en blanco
    } else {
      console.log("Actualizar", sala); // Se debe borrar al final
      actSalaCall(salas, indice, setSalas, sala, setModal2, setModal1, setModal3);
    }
  }

  return(
    <div className='d-flex justify-content-center'>
      <MDBCol md='10'>
      <p>Edite los datos de sala a continuación:</p>
      <form>

        {/* Numero de Sala (Lo estoy llevando a que sea un texto de maximo 5 caracteres) */}
        <div className='d-flex'>
        <label className="my-auto mx-2">Número:</label>
        {/*<input name="numero" className="form-control mr-2" placeholder="Numero" onChange={cambioInput}
          type="number" minLength="1" maxLength="5" required value={sala.numero}/>
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
          <Button onClick={() => actualizarSala()} color="success">Guardar</Button>
          <Button onClick={() => setModal2(false)} color="danger">Cancelar</Button>
        </div>

      </form> 
      </MDBCol>
      
      {/* Este modal1 es para mostrar un mensaje de error si el numero de sala ingresado ya existe en la base de datos */}
      <Modal isOpen={modal1} toggle={() => setModal1(false)} centered>
      <ModalHeader close={<button className="close" onClick={() => setModal1(false)}>X</button>}
        toggle={() => setModal1(false)}>Mensaje</ModalHeader>
      <ModalBody>
        El número de sala ingresado ya existe. Por favor ingrese otro número de sala.
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => setModal1(false)}>Aceptar</Button>
      </ModalFooter>
      </Modal>

      {/* Este modal3 es para mostrar un mensaje de error si no se pudo editar la sala en la base de datos, por ejemplo si el backend esta caido o no responde */}
      <Modal isOpen={modal3} toggle={() => setModal3(false)} centered>
      <ModalHeader close={<button className="close" onClick={() => setModal3(false)}>X</button>}
        toggle={() => setModal3(false)}>Mensaje</ModalHeader>
      <ModalBody>
        No fue posible realizar actualización en la base de datos, contacte al departamento de soporte.
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => setModal3(false)}>Aceptar</Button>
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

export default SalaEdit;