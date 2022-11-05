import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux'

import { store } from './store'

import UserValidateWrapper from './UserValidateWrapper';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Feeds from './components/Feeds';
import FeedInfo from './components/FeedInfo';
import NotFound from './components/NotFound';

function MountApp() {
  return (
    <Provider store={store}>
      <UserValidateWrapper>
        <Router>
          <Routes>
            <Route path='/' element={<Navigate to='/login' />} />
            <Route path='/login' element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path='feeds' element={<Feeds />} />
              <Route path='feeds/:feedId' element={<FeedInfo />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </UserValidateWrapper>
    </Provider>
  );
}

export default MountApp;
