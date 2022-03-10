import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './NavBar.css';
import { setearRuta, setearEstaLogueado, setearEsAdmin, setearUsuario } from '../actions';

const mapStateToProps = (estado) => {
  return {
    usuario: estado.usuario,
    esAdmin: estado.esAdmin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setRuta: (texto) => dispatch(setearRuta(texto)),
    setEstaLogueado: (booleano) => dispatch(setearEstaLogueado(booleano)),
    setEsAdmin: (booleano) => dispatch(setearEsAdmin(booleano)),
    setUsuario: (obj) => dispatch(setearUsuario(obj)),
  }
}

const iniUsuario = {
  id: '',
  nombre: '',
  cedula: '',
  celular: '',
  email: '',
  joined: ''
}

const DropDownUsuario = (props) => {
  const { usuario, esAdmin, setRuta, setEstaLogueado, setEsAdmin, setUsuario } = props;

  const [dropDown, setDropDown] = useState(false);
  const toggleDropDown = () => (setDropDown(!dropDown));
  const cerrarSesion = () => {
    setEstaLogueado(false);
    esAdmin && setEsAdmin(false); // similar a if statement
    setUsuario(iniUsuario);
    setRuta('signin');
    window.localStorage.removeItem('token');
  }

  return(
    <Dropdown className="mx-3 my-1 text-white" isOpen={dropDown} toggle={toggleDropDown}>
      Bienvenido(a),&nbsp;&nbsp;
      <DropdownToggle className="enlace" data-toggle="dropdown" tag="span" caret>
        {usuario.nombre}
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem onClick={() => setRuta('perfil')}>Ver Perfil</DropdownItem>
        <DropdownItem divider />
        <DropdownItem onClick={cerrarSesion}>Cerrar Sesión</DropdownItem>
        { esAdmin ?
        <div>
        <DropdownItem divider />
        <DropdownItem onClick={() => setRuta('edit_pelis')}>Administrar películas</DropdownItem>
        <DropdownItem onClick={() => setRuta('salas')}>Administrar salas</DropdownItem>
        </div>
        : <div></div> }
      </DropdownMenu>
    </Dropdown>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDownUsuario);