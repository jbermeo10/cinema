import React, { useState, useEffect } from 'react'; // Importo useEffect y useState que son hooks de React para manejar estado
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle } from 'mdbreact'; // forma parte de bootstrap para react, para mostrar un card para cada pelicula
import { retrieveImgCall } from './ApiCalls.js' // con esta funcion traigo la foto de cada pelicula para cada card
import defaultImg from '../images/defaultImg.jpg'; // Aqui importo ua imagen generica para cuando no pueda encontrar la imagen de determinada pelicula en el server
import './PeliculaSimple.css'; // de aca traigo codigo CSS de lo sgte: tarjeta

const PeliculaSimple = ({ id, titulo }) => {
  // El 'undefined' se interpreta como: todavía no sé si hay imagen, estoy esperando que el backend responda
  const [imagenUrl, setImagenUrl] = useState(undefined); 

  // Cuando el componente se monta (o cuando cambia el id), llama a retrieveImgCall que recibe el id de la película → va al backend a buscar la imagen de esa película
  // Si la encuentra → llama a setImagenUrl con la URL real de la imagen
  // Si no la encuentra → usa defaultImg como imagen (una imagen generica que esta en el front)
    useEffect(() => retrieveImgCall(id, setImagenUrl, defaultImg), [id]);

  // Aca dibujo el card de la pelicula utilizando el estilo 'tarjeta' de CSS y el titulo de la misma que es un parametro de entrada, asi como el URL de la imagen seteado antes
  return (
      <MDBCard className='mx-5 my-5 tarjeta'>
        <MDBCardBody>
          <MDBCardTitle className='text-center'>{titulo}</MDBCardTitle>
        </MDBCardBody>
        {/*img-fluid: clase de Bootstrap que hace la imagen responsiva. Se adapta automáticamente al ancho de su contenedor sin desbordarse.
           waves — es un efecto visual de MDBReact que agrega una animación de ondas al hacer clic sobre la imagen, como una ripple effect.*/}
        <MDBCardImage className="img-fluid" src={imagenUrl} waves/>
      </MDBCard>
  );
}

export default PeliculaSimple;
