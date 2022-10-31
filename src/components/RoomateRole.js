import React from 'react';

import { useStateValue } from '../StateProvider';

function RoomateRole() {
  const [{ user }] = useStateValue();

  console.log(user);

  return <div className='roomateRole'>Hi</div>;
}

export default RoomateRole;
