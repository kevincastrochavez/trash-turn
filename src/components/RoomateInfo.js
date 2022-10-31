import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStateValue } from '../StateProvider';
import { db } from '../firebase';
import Stepper from './Stepper';
import RoomateRole from './RoomateRole';

function RoomateInfo() {
  const [userFromDb, setUserFromDb] = useState(null);
  const [{ user }] = useStateValue();
  const navigate = useNavigate();

  useEffect(() => {
    async function getUsers() {
      const usersSnapshot = await db.collection('users').get();
      const userFromFirebase = usersSnapshot.docs.find(
        (userDb) => userDb.data().uid === user.uid
      );

      setUserFromDb(userFromFirebase);
    }

    getUsers();
  }, []);

  return <div>{userFromDb ? navigate('/') : <Stepper />}</div>;
}

export default RoomateInfo;
