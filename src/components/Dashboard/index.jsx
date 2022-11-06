import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "../Header";
import Spinner from "../Spinner";

import styles from './index.module.css';

const Dashboard = () => {
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

export default Dashboard;