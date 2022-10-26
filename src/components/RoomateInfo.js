import React from 'react';

import { useStateValue } from '../StateProvider';

function RoomateInfo() {
  const [{ user }] = useStateValue();

  console.log(user);
  return <div>RoomateInfo</div>;
}

export default RoomateInfo;
