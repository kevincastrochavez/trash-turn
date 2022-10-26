import React from 'react';

function RadioBtn({ label, active, callback }) {
  return (
    <div onClick={callback} className={`radioBtn ${active ? 'active' : ''}`}>
      {label}
    </div>
  );
}

export default RadioBtn;
