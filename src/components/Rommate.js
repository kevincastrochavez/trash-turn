import React from 'react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Draggable } from 'react-beautiful-dnd';

function Roomate({ index, id, name, photoUrl }) {
  console.log(id);

  return (
    <Draggable draggableId={`${id}`} index={index}>
      {(provided) => (
        <div
          className='roomate'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <DragIndicatorIcon />

          <img src={photoUrl} alt={`${name} profile`} />

          <div>
            <h4>{name}</h4>
            <p>Last time thrown:</p>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Roomate;
