import React from 'react';
import portada from './portada.jpg';

const PeliculaSimple = ({ titulo, rutaImagen }) => {
  return (
    <div className='tc bg-light-green br3 pa3 ma2 grow bw2 shadow-5'>
        <h2>{titulo}</h2>
        <img src={portada} alt={rutaImagen} width='auto' height='300px'/>
    </div>
  );
}

export default PeliculaSimple;