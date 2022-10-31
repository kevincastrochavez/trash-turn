import React from 'react';

function Roomate({ photoUrl, name }) {
  return (
    <div className='roomate'>
      <img src={photoUrl} alt={`${name} profile`} />

      <h4>{name}</h4>
    </div>
  );
}

export default Roomate;
