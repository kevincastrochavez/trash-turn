import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useStateValue } from '../StateProvider';
import Stepper from './Stepper';

function RoomateInfo() {
  const [{ fullUser }] = useStateValue();
  const navigate = useNavigate();

  console.log(fullUser);

  // If user logged in already has complex and apartment, navigates to root route, if not, goes to stepper to be assigned
  return <div>{fullUser ? navigate('/') : <Stepper />}</div>;
}

export default RoomateInfo;
