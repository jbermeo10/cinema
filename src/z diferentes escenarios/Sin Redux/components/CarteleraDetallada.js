import React, { useEffect, useState }  from 'react';
import PeliculaDetallada from './PeliculaDetallada';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { MDBCol } from "mdbreact";
// import { peliculas } from '../DBpeliculas';
import { peliculasCall, salasCall } from './ApiCalls.js'



const CarteleraDetallada = ({ estaLogueado, usuario, setRuta }) => {

  const [peliculas, setPeliculas] = useState([]);
  useEffect(() => peliculasCall(setPeliculas), []);
  const [salas, setSalas] = useState([]);
  useEffect(() => salasCall(setSalas), []);
  const [genero, setGenero] = useState('');
  const [dropDown, setDropDown] = useState(false);
  const toggleDropDown = () => (setDropDown(!dropDown));

  // How to eliminate duplicates of an array
  // uniqueArray = arr.filter (function (value, index, array) { 
  //   return array.indexOf (value) == index;
  // });
  const uniqueGeneros = peliculas.map(item => item.genero).filter((item, index, array) => array.indexOf(item) === index)
  const filteredPelis = peliculas.filter(item => item.genero.toLowerCase().includes(genero.toLowerCase()))
  const onGeneroClick = (event) => (event.target.innerText === 'Todos' ? setGenero('') : setGenero(event.target.innerText))
  
  if(!peliculas.length) {
    return (
      <div className="mt-5">
        <h1 className="text-center">Cargando...</h1>
        <h2 className="text-center">Favor espere</h2>
      </div>
    )
  } else {
    return (
      <div>
        <div className='d-flex justify-content-center'>
          <MDBCol md='10'>
            <h1 className="h3 bg-info text-white mt-5 py-2 shadow text-center">CARTELERA DETALLADA</h1>
              <Dropdown className="text-white text-right" size="sm" isOpen={dropDown} toggle={toggleDropDown}>
                <DropdownToggle color="dark" size="md" caret data-toggle="dropdown">
                  Género
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem onClick={onGeneroClick}>Todos</DropdownItem>
                  <DropdownItem divider />
                  {uniqueGeneros.map((item, index)  => <DropdownItem key={index} onClick={onGeneroClick}>{item}</DropdownItem>)}
                </DropdownMenu>
              </Dropdown>
          </MDBCol>
        </div>
        {filteredPelis.map((item, index)  => {
          return (
            <PeliculaDetallada key={index} pelicula={item} salas={salas} estaLogueado={estaLogueado} usuario={usuario} setRuta={setRuta}/>              
          );
        })}
      </div>
    );
  }
}

export default CarteleraDetallada;