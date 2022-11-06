import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux'

import Spinner from './components/Spinner';

import { store } from './store'

const UserValidateWrapper = React.lazy(() => import('./UserValidateWrapper'));
const Login = React.lazy(() => import('./components/Login'));
const Dashboard = React.lazy(() => import('./components/Dashboard'));
const Feeds = React.lazy(() => import('./components/Feeds'));
const FeedInfo = React.lazy(() => import('./components/FeedInfo'));
const NotFound = React.lazy(() => import('./components/NotFound'));



function MountApp() {
  return (
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <UserValidateWrapper>
          <Router>
            <Routes>
              <Route path='/' element={<Navigate to='/login' />} />
              <Route path='/login' element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="" element={<Navigate to='/dashboard/feeds' />} />
                <Route path='feeds' element={<Feeds />} />
                <Route path='feeds/:feedId' element={<FeedInfo />} />
              </Route>
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Router>
        </UserValidateWrapper>
      </Suspense>
    </Provider>
  );
}

export default MountApp;
