import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useStateValue } from '../StateProvider';
import Stepper from './Stepper';

function RoomateInfo() {
  const [{ user }] = useStateValue();
  const navigate = useNavigate();

  // If user logged in already has complex and apartment, navigates to root route, if not, goes to stepper to be assigned
  return <div>{user?.complex ? navigate('/') : <Stepper />}</div>;
}

export default RoomateInfo;
