import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { signInWithGoogle } from '../../services/firebase';

import './index.css'

export default function Login() {
    
    const { uid }  = useSelector(state => state.user);

    if (uid) {
        return <Navigate to='/dashboard/feeds' />
    }

    return (
        <div className="login-buttons">
            <button className="login-provider-button" onClick={signInWithGoogle}>
                <img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon" />
                <span> Continue with Google</span>
            </button>
        </div>
    );
}