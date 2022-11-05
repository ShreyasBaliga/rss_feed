import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "../Header";

const ProtectedLayout = () => {
  const { uid } = useSelector(state => state.user);

  if (!uid) {
    return <Navigate to="/login" />;
  }

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Header />
      <Outlet />
    </div>
  )
};

export default ProtectedLayout;