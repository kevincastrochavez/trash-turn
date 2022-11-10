import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { CircularProgress, Snackbar } from '@mui/material';
import { useEffect } from 'react';
import MuiAlert from '@mui/material/Alert';
import moment from 'moment';

import { db } from '../firebase';
import { useStateValue } from '../StateProvider';
import Roomate from './Roomate';

function RoomateRole() {
  const [{ fullUser }] = useStateValue();
  const [roomates, setRoomates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Snackbar alert
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  });

  // Close alert
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowAlert(false);
  };

  const onDragEnd = (e) => {
    setLoading(true);

    if (fullUser.uid === e.draggableId) {
      db.collection('complexes')
        .doc(fullUser.complex)
        .collection(fullUser.complex)
        .doc(fullUser.apartment)
        .collection('roomates')
        .doc(e.draggableId)
        .update({ timestamp: moment(new Date()).format('MMMM DD, h:mm:ss a') })
        .then(() => {
          setLoading(false);
          setAlertMessage('Thanks for taking the trash out!');
          setShowAlert(true);
        });
    } else {
      setAlertMessage("You cannot drag your roomate's card");
      setShowAlert(true);
      setLoading(false);
    }
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

          setRoomates(roomates);
        });
    }
  }, [loading]);

  return (
    <div className='roomateRole'>
      <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
        <h1>Roommates</h1>

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

      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={
            alertMessage === "You cannot drag your roomate's card"
              ? 'warning'
              : 'success'
          }
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>

      {loading && (
        <div className='loading'>
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default RoomateRole;
