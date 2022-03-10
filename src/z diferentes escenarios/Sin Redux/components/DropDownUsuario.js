import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './NavBar.css';


const iniUsuario = {
  id: '',
  nombre: '',
  cedula: '',
  celular: '',
  email: '',
  joined: ''
}

const DropDownUsuario = ({ setRuta, usuario, esAdmin, setEstaLogueado, setEsAdmin, setUsuario }) => {

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

export default DropDownUsuario;