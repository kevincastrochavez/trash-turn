import React, { useState } from 'react';
import { useEffect } from 'react';
import { db } from '../firebase';

import { useStateValue } from '../StateProvider';
import Roomate from './Rommate';

function RoomateRole() {
  const [{ fullUser }] = useStateValue();
  const [roomates, setRoomates] = useState([]);

  useEffect(() => {
    if (roomates) {
      db.collection('complexes')
        .doc(fullUser.complex)
        .collection(fullUser.complex)
        .doc(fullUser.apartment)
        .collection('roomates')
        .get()
        .then((snapshot) => {
          const roomates = [];
          snapshot.forEach((doc) => roomates.push(doc.data()));

          setRoomates(roomates);
        });
    }
  }, []);

  return (
    <div className='roomateRole'>
      <h1>Roomates</h1>

      {roomates.map((roomate, index) => (
        <Roomate key={index} name={roomate.name} photoUrl={roomate.photoUrl} />
      ))}
    </div>
  );
}

export default RoomateRole;
