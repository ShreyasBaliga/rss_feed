import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AiOutlineGoogle } from 'react-icons/ai';

import { signInWithGoogle } from '../../services/firebase';
import LoginImage from '../../assets/images/login.svg';
import Button from '../Button';
import styles from './index.module.css'

export default function Login() {

    const { uid } = useSelector(state => state.user);

    if (uid) {
        return <Navigate to='/dashboard/feeds' />
    }

    return (
        <div className={styles.container}>
            <img alt='login' src={LoginImage} className={styles.image} />
            <span className={styles.primaryText}>Welcome to the rssFeedViewer</span>
            <span className={styles.secondaryText}>Please sign-in to continue</span>
            <Button primary={false}  onClick={signInWithGoogle}>
                <AiOutlineGoogle className={styles.googleIcon} />
                <span> Sign-In with Google</span>
            </Button>
        </div>
    );
}