import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './Login';
import RommateInfo from './RoomateInfo';

function Layout() {
  return (
    <div className='layout'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/rommateInfo' element={<RommateInfo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Layout;
