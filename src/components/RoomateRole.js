import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useEffect } from 'react';
import { db } from '../firebase';

import { useStateValue } from '../StateProvider';
import Roomate from './Rommate';

function RoomateRole() {
  const [{ fullUser }] = useStateValue();
  const [roomates, setRoomates] = useState([]);

  const onDragEnd = (e) => {
    console.log(e);
  };

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
                />
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default RoomateRole;
