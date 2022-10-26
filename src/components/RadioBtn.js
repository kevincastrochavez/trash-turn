import React from 'react';

function RadioBtn({ label, active }) {
  return <div className={`radioBtn ${active ? 'active' : ''}`}>{label}</div>;
}

export default RadioBtn;
