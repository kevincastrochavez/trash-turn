import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import GoogleIcon from '@mui/icons-material/Google';

import Button from '../components/Button';

function Login() {
  const [loginClass, setLoginClass] = useState('loginStart');

  setTimeout(() => {
    setLoginClass('loginStill');
  }, 2000);

  return (
    <div className={loginClass}>
      <div className='loginStart__icon'>
        <DeleteIcon />
      </div>

      <div className='loginStill__loginInfo'>
        <h1>Whose turn is it?</h1>

        <p>Never take out the trash when you are not supposed to</p>

        <Button Icon={GoogleIcon} text='Sign In with Google' />
      </div>
    </div>
  );
}

export default Login;
