import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logOut } from '../../services/firebase';

import './index.css'
import myRSSFeederLogo from '../../assets/images/myRSSFeederLogo.png';

const Header = () => {
    const navigate = useNavigate();
    const onLogout = async () => {
        await logOut();
        navigate('/login');
    };

    return (
        <div className='header'>
            <img src={myRSSFeederLogo} alt="logo" className='logo'/>
            <div className='nav-link-wrapper'>
                <button onClick={onLogout}>Logout</button>
            </div>
        </div>

    );
};

export default Header;
