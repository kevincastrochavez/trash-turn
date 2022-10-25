import React from 'react';

function Button({ Icon, text }) {
  return (
    <button className='buttonComponent'>
      {Icon && <Icon />}
      {text}
    </button>
  );
}

export default Button;
