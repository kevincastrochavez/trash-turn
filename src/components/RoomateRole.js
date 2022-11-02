import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import moment from 'moment';

import { db } from '../firebase';
import { useStateValue } from '../StateProvider';
import Roomate from './Roomate';

function RoomateRole() {
  const [{ fullUser }] = useStateValue();
  const [roomates, setRoomates] = useState([]);
  const [loading, setLoading] = useState(false);

  const onDragEnd = (e) => {
    setLoading(true);

    db.collection('complexes')
      .doc(fullUser.complex)
      .collection(fullUser.complex)
      .doc(fullUser.apartment)
      .collection('roomates')
      .doc(e.draggableId)
      .update({ timestamp: moment(new Date()).format('MMMM DD, h:mm:ss a') })
      .then(() => setLoading(false));
  };

  useEffect(() => {
    if (roomates) {
      db.collection('complexes')
        .doc(fullUser.complex)
        .collection(fullUser.complex)
        .doc(fullUser.apartment)
        .collection('roomates')
        .orderBy('timestamp', 'asc')
        .get()
        .then((snapshot) => {
          const roomates = [];
          snapshot.forEach((doc) => roomates.push(doc.data()));
          console.log(roomates);

          setRoomates(roomates);
        });
    }
  }, [loading]);

  return (
    <div className='roomateRole'>
      <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
        <h1>Roomates</h1>

        <Droppable droppableId='1'>
          {(provided) => (
            <div
              className='roomateRole__container'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {roomates.map((roomate, index) => (
                <Roomate
                  key={index}
                  index={index}
                  id={roomate.uid}
                  name={roomate.name}
                  photoUrl={roomate.photoUrl}
                  timestamp={roomate.timestamp}
                />
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {loading && (
        <div className='loading'>
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default RoomateRole;
