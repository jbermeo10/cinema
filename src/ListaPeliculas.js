import React from 'react';
import PeliculaSimple from './PeliculaSimple';

const ListaPeliculas = ({ listado }) => {
  return (
    <div className='dib'>
      {
        listado.map((item, index)  => {
            return (
                <PeliculaSimple 
                  key={index} 
                  titulo={listado[index].titulo} 
                  rutaImagen={listado[index].imagen}
                />
            );
        })
      }
    </div>
  );
}

export default ListaPeliculas;