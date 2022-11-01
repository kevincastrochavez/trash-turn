import React from 'react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

function Roomate({ photoUrl, name }) {
  return (
    <div className='roomate'>
      <DragIndicatorIcon />

      <img src={photoUrl} alt={`${name} profile`} />

      <div>
        <h4>{name}</h4>
        <p>Last time thrown:</p>
      </div>
    </div>
  );
}

export default Roomate;
