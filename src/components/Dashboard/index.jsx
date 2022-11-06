import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from './index.module.css';
import Header from "../Header";
import Spinner from "../Spinner";

const ProtectedLayout = () => {
  const { uid, status } = useSelector(state => state.user);

  if (status === 'loading') return <Spinner />;

  if (!uid) {
    return <Navigate to="/login" />;
  }

  return (
    <div className={styles.container}>
      <Header />
      <Outlet />
    </div>
  )
};

export default ProtectedLayout;