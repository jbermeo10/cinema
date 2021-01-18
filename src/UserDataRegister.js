import React from 'react';
import UserData from './UserData';

const UserDataRegister = () => {
  return (
    <div>
        <UserData name='Cédula:'/>
        <UserData name='Celular:'/>
        <UserData name='Correo Electrónico:'/>
        <UserData name='Contraseña:'/>
    </div>
  );
}

export default UserDataRegister;