import React from 'react';

function RadioBtn({ label, active, callback }) {
  return (
    // Dynamic class to show which one was selected
    <div onClick={callback} className={`radioBtn ${active ? 'active' : ''}`}>
      {label}
    </div>
  );
}

export default RadioBtn;
