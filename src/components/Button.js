import React from 'react';

function Button({ Icon, text, callback }) {
  return (
    <button onClick={callback && callback} className='buttonComponent'>
      {Icon && <Icon />}
      {text}
    </button>
  );
}

export default Button;
