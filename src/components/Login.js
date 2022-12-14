import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';

import { auth, provider, db } from '../firebase';
import { useStateValue } from '../StateProvider';
import Button from '../components/Button';

function Login() {
  const [loginClass, setLoginClass] = useState('loginStart');
  const [{}, dispatch] = useStateValue();
  const navigate = useNavigate();

  setTimeout(() => {
    // Changing the css class on login so it performs the animation
    setLoginClass('loginStill');
  }, 1000);

  // Signs in user with the Google provider
  const signIn = () => {
    auth.signInWithPopup(provider).then((result) => {
      // Prepares user object to send it
      const user = {
        name: result.user.displayName,
        photoUrl: result.user.photoURL,
        uid: result.user.uid,
      };

      db.collection('users')
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            // Dispatches user to the context layer, whether is a new user or one with complex and apartment already assigned
            dispatch({
              type: 'SET_FULL_USER',
              fullUser: doc.data(),
            });
          } else {
            dispatch({
              type: 'SET_USER',
              user: user,
            });
          }
        });

      // Redirects to page to assign complex and apartment
      navigate('/rommateInfo');
    });
  };

  return (
    <div className={loginClass}>
      <div className='loginStart__icon'>
        <DeleteIcon />
      </div>

      <div className='loginStill__loginInfo'>
        <h1>Whose turn is it?</h1>

        <p>Never take out the trash when you are not supposed to</p>

        <Button onClick={signIn} Icon={GoogleIcon} text='Sign In with Google' />
      </div>
    </div>
  );
}

export default Login;
