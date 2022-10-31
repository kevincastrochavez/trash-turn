import React from 'react';

function Roomate({ photoUrl, name }) {
  return (
    <div className='roomate'>
      <img src={photoUrl} alt={photoUrl} />

      <p>{name}</p>
    </div>
  );
}

export default Roomate;
