import React from 'react';
import UserData from './UserData';

const UserDataLogin = () => {
  return (
    <div>
        <UserData name='Cédula:'/>
        <UserData name='Contraseña:'/>
    </div>
  );
}

export default UserDataLogin;