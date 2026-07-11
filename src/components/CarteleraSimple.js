import React, { useEffect, useState } from 'react'; // Importo React por el uso de JSX, pero como tengo react version 17 lo podria borrar, useEffect y useState son hooks de React 
import PeliculaSimple from './PeliculaSimple';  // Visualizacion de la pelicula en forma simple (solo titulo y foto)
import { MDBCol } from "mdbreact"; // forma parte de bootstrap para react, para hacer responsiva la visualizacion
// import { peliculas } from '../DBpeliculas'; // esto lo usaba cuando aun no tenia una base de datos dedicada para manejar la informacion de las peliculas
import { peliculasCall } from './ApiCalls.js' // con esta funcion traigo la informacion de las peliculas de la base de datos para mostrarla en el frontend
import './CarteleraSimple.css'; // de aca traigo codigo CSS de lo sgte: titulo-cartelera, contenedor-peliculas

const CarteleraSimple = () => {
  const [peliculas, setPeliculas] = useState([]); // variable de estado local 'peliculas'
  useEffect(() => peliculasCall(setPeliculas), []); // hook asincrono para actualizar la variable de estado local 'peliculas'
  
  // Esto era para lanzar un error intencional y probar la componente ErrorBoundary en App.js para propositos de testeo
  // if(true) {
  //   throw new Error('Nooooo!!');
  // }

  // Esto es para mostrar un mensaje de ''cargando...' mientras cargo la informacion del backend, podria utilizar mejor un spinner (por desarrollar luego)
  if(!peliculas.length) {
    return (
      <div className="mt-5">
        <h1 className="text-center">Cargando...</h1>
        <h2 className="text-center">Favor espere</h2>
      </div>
    )

  // Aqui cargo todas las peliculas de la base de datos, utilizo codigo CSS importado 'titulo-cartelera' y 'contenedor-peliculas'
  } else {
    return (
      <div className=''>
        {/* Este es el titulo de la cartelera simple */}
        <MDBCol md="8" className='mx-auto'>
          <h1 className='titulo-cartelera'>PELICULAS EN CARTELERA</h1>
        </MDBCol>

        {/* Aqui dibujo todas las peliculas de la base de datos en la vista cartelera simple
        tener en cuenta que item es el objeto completo mientras que index es la posicion del objeto en el arreglo (un numero entero 0, 1, 2,...) */}
        <MDBCol md="8" className='mx-auto mb-5 contenedor-peliculas'>
          {peliculas.map((item)  => {
              return ( 
                <PeliculaSimple 
                  /*key={index} // borrado y reemplazado con la linea de abajo por consejo de claude*/
                  key={item.id}
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
