import React from 'react';

function RadioBtn({ label, active, onClick, Icon, img }) {
  return (
    // Dynamic class to show which one was selected
    <div onClick={onClick} className={`radioBtn ${active ? 'active' : ''}`}>
      {Icon}
      {img && <img src={img} alt='' />}
      {label}
    </div>
  );
}

export default RadioBtn;
