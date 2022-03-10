import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle } from 'mdbreact';
import { retrieveImgCall } from './ApiCalls.js'
import defaultImg from '../images/defaultImg.jpg';
import './PeliculaSimple.css';

const PeliculaSimple = ({ id, titulo }) => {
  const [imagenUrl, setImagenUrl] = useState(undefined);
  useEffect(() => retrieveImgCall(id, setImagenUrl, defaultImg), [id]);

  return (
      <MDBCard className='mx-5 my-5 tarjeta'>
        <MDBCardBody>
          <MDBCardTitle className='text-center'>{titulo}</MDBCardTitle>
        </MDBCardBody>
        <MDBCardImage className="img-fluid" src={imagenUrl} waves/>
      </MDBCard>
  );
}

export default PeliculaSimple;
