import React from 'react';

//Card = ({ id, name, email }) 
const UserData = ({name}) => {
  return (
    <div className='tc'>
        <h2>{name}</h2>
        <input
            className='pa3 ba b--green bg-lightest-blue'
            type='search'
            placeholder='Digitelo'
      />
    </div>
  );
}

export default UserData;