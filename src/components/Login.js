import React, { useEffect, useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import DeleteIcon from '@mui/icons-material/Delete';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';

import { auth, provider, db } from '../firebase';
import { useStateValue } from '../StateProvider';
import Button from '../components/Button';

function Login() {
  const [complexes, setComplexes] = useState(null);
  const [loginClass, setLoginClass] = useState('loginStart');
  const [{}, dispatch] = useStateValue();
  const navigate = useNavigate();

  setTimeout(() => {
    // Changing the css class on login so it performs the animation
    setLoginClass('loginStill');
  }, 1000);

  // Gets the complexes from firebase so they are fetched early in the app
  useEffect(() => {
    async function getComplexes() {
      const complexesSnapshot = await getDocs(collection(db, 'complexes'));
      const complexesList = complexesSnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      setComplexes(complexesList);
    }

    getComplexes();
  }, []);

  // Signs in user with the Google provider
  const signIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      // Prepares user object to send it
      const user = {
        name: result.user.displayName,
        email: result.user.email,
        photoUrl: result.user.photoURL,
      };

      // Dispatches user to the context layer
      dispatch({
        type: 'SET_USER',
        user: user,
      });

      dispatch({
        type: 'SET_COMPLEXES',
        complexes: complexes,
      });

      // Redirects to different page
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

        <Button
          callback={signIn}
          Icon={GoogleIcon}
          text='Sign In with Google'
        />
      </div>
    </div>
  );
}

export default Login;
