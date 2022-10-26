import React from 'react';

import { useStateValue } from '../StateProvider';
import Stepper from './Stepper';

function RoomateInfo() {
  const [{ user }] = useStateValue();

  return (
    <div>
      <Stepper />
    </div>
  );
}

export default RoomateInfo;
