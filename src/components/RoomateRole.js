import React, { useState } from 'react';
import { useEffect } from 'react';
import { db } from '../firebase';

import { useStateValue } from '../StateProvider';
import Roomate from './Rommate';

function RoomateRole() {
  const [{ user }] = useStateValue();
  const [roomates, setRoomates] = useState([]);

  useEffect(() => {
    db.collection('complexes')
      .doc(user.complex)
      .collection(user.complex)
      .doc(user.apartment)
      .collection('roomates')
      .get()
      .then((snapshot) => {
        const roomates = [];
        snapshot.forEach((doc) => roomates.push(doc.data()));

        setRoomates(roomates);
      });
  }, []);

  return (
    <div className='roomateRole'>
      <h1>Roomates</h1>

      {roomates.map((roomate) => (
        <Roomate name={roomate.name} photoUrl={roomate.photoUrl} />
      ))}
    </div>
  );
}

export default RoomateRole;
