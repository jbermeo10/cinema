import React, { useEffect, useState } from 'react';
import PeliculaSimple from './PeliculaSimple';
import { MDBCol } from "mdbreact";
// import { peliculas } from '../DBpeliculas';
import { peliculasCall } from './ApiCalls.js'
import './CarteleraSimple.css';

const CarteleraSimple = () => {
  const [peliculas, setPeliculas] = useState([]);
  useEffect(() => peliculasCall(setPeliculas), []);
  
  // if(true) {
  //   throw new Error('Nooooo!!');
  // }

  if(!peliculas.length) {
    return (
      <div className="mt-5">
        <h1 className="text-center">Cargando...</h1>
        <h2 className="text-center">Favor espere</h2>
      </div>
    )
  } else {
    return (
      <div className=''>
        <MDBCol md="8" className='mx-auto'>
          <h1 className='titulo-cartelera'>PELICULAS EN CARTELERA</h1>
        </MDBCol>
        <MDBCol md="8" className='mx-auto mb-5 contenedor-peliculas'>
          {peliculas.map((item, index)  => {
              return ( 
                <PeliculaSimple 
                  key={index} 
                  id={item.id}
                  titulo={item.titulo}
                />
              );
            })}
        </MDBCol>
      </div>
    );  
  }
}

export default CarteleraSimple;
