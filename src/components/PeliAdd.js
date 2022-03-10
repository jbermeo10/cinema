import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { MDBCol } from "mdbreact";
import { addPeliCall } from './ApiCalls.js'

const PeliAdd = ({ pelis, setPelis, setModal3 }) => {
  const [peli, setPeli] = useState({
    titulo: '',
    // imagen: '',
    descripcion: '',
    duracion: '',
    genero: '',
    horas: ''
  });
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal4, setModal4] = useState(false);
  const [archivo, setArchivo] = useState(undefined);

  const cambioInput = (event) => {
    switch (event.target.name) {
      case 'titulo':
        setPeli({...peli, titulo: event.target.value})
        break;
      case 'imagen':
        // setPeli({...peli, imagen: event.target.files[0].name})
        setArchivo(event.target.files[0])
        break;
      case 'descripcion':
        setPeli({...peli, descripcion: event.target.value})
        break;
      case 'duracion':
        setPeli({...peli, duracion: event.target.value})
        break; 
      case 'genero':
        setPeli({...peli, genero: event.target.value})
        break; 
      case 'horas':
        setPeli({...peli, horas: event.target.value})
        break; 
      default:
        console.log("Error: default alcanzado")
        return;
    }
  }
  const agregarPeli = () => {
    if(peli.titulo === '') {
      console.log("Titulo en blanco");
      setModal4(true);
    } else {
      console.log("Agregar", peli);
      addPeliCall(pelis, setPelis, peli, archivo, setModal3, setModal, setModal2);
    }
  }
  return(
    <div className='d-flex justify-content-center'>
      <MDBCol md='11'>
      <p>Edite los datos de la película a continuación:</p>
      <form>
        <div className='d-flex'>
          <label className="my-auto mx-2">Título:</label>
          <input name="titulo" className="form-control mr-2" placeholder="Título" onChange={cambioInput}
            minLength="1" maxLength="100" required value={peli.titulo}/>
        </div>
          <br/>
        <div className="input-group">
          <label htmlFor="formFile" className="my-auto mx-2">Imagen:</label>
          <input name="imagen" type="file" className="form-control" id="formFile" accept="image/*" 
            onChange={cambioInput}/>
          <div className="input-group-post mr-2">
            {/* <span className="input-group-text" id="inputGroupFileAddon01">(*.jpg)</span> */}
            <span className="input-group-text">(*.jpg)</span>
          </div>
        </div>
          <br/>
        <div className='d-flex'>
          <label className="my-auto mx-2">Descripción:</label>
          <textarea name="descripcion" className="form-control mr-2" placeholder="Descripción" rows="2"
            onChange={cambioInput} value={peli.descripcion}/>
        </div>
          <br/>
        <div className='d-flex'>
          <label className="my-auto mx-2">Duración:</label>
          <input name="duracion" className="form-control mr-2" placeholder="Duración" maxLength="20"
            onChange={cambioInput} value={peli.duracion}/>
        </div>
          <br/>
        <div className='d-flex'>
          <label className="my-auto mx-2">Género:</label>
          <input name="genero" className="form-control mr-2" placeholder="Género" maxLength="20"
            onChange={cambioInput} value={peli.genero}/>
        </div>
          <br/>
        <div className='d-flex'>
          <label className="my-auto mx-2">Horas:</label>
          <input name="horas" className="form-control mr-2" placeholder="Horas" onChange={cambioInput}
            value={peli.horas}/>
        </div>
          <br/>
        <div className="my-4 d-flex" style={{justifyContent:'space-evenly'}}>
          <Button onClick={() => agregarPeli()} color="success">Guardar</Button>
          <Button onClick={() => setModal3(false)} color="danger">Cancelar</Button>
        </div>
      </form> 
      </MDBCol>

      <Modal isOpen={modal} toggle={() => setModal(false)} centered>
      <ModalHeader close={<button className="close" onClick={() => setModal(false)}>X</button>}
        toggle={() => setModal(false)}>Mensaje</ModalHeader>
      <ModalBody>
        El título de película ingresado ya existe. Por favor ingrese otro título.
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
        Por favor ingresar el título de la película
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => setModal4(false)}>Aceptar</Button>
      </ModalFooter>
      </Modal>
      
    </div>
  )
}

export default PeliAdd;