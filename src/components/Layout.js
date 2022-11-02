import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useStateValue } from '../StateProvider';
import Login from './Login';
import RommateInfo from './RoomateInfo';
import RommateRole from './RoomateRole';

function Layout() {
  const [{ fullUser }] = useStateValue();

  return (
    <div className='layout'>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path='/'
            element={
              fullUser === null ? <Navigate to='/login' /> : <RommateRole />
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/rommateInfo' element={<RommateInfo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Layout;
