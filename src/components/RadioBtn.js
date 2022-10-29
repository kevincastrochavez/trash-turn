import React from 'react';

function RadioBtn({ label, active, onClick }) {
  return (
    // Dynamic class to show which one was selected
    <div onClick={onClick} className={`radioBtn ${active ? 'active' : ''}`}>
      {label}
    </div>
  );
}

export default RadioBtn;
