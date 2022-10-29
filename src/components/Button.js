import React from 'react';

function Button({ Icon, text, onClick, className, reverse }) {
  return (
    <button
      onClick={onClick && onClick}
      className={`buttonComponent ${className} ${
        reverse && 'buttonComponent__reverse'
      }`}
    >
      {/* In case we want to pass an icon */}
      {Icon && <Icon />}
      {text}
    </button>
  );
}

export default Button;
