import React from 'react';

function Button({ Icon, text, callback }) {
  return (
    <button onClick={callback && callback} className='buttonComponent'>
      {/* In case we want to pass an icon */}
      {Icon && <Icon />}
      {text}
    </button>
  );
}

export default Button;
