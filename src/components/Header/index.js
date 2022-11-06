import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logOut } from '../../services/firebase';

import styles from './index.module.css'
import myRSSFeederLogo from '../../assets/images/myRSSFeederLogo.png';
import UserAvatar from '../UserAvatar';
import UserModal from '../UserModal';

const Header = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const { displayName, email } = useSelector(state => state.user);

    const onLogout = async () => {
        await logOut();
        navigate('/login');
    };

    const toggleModal = () => setShowModal(modal => !modal);

    return (
        <div className={styles.header}>
            <img src={myRSSFeederLogo} alt="logo" className={styles.logo}/>
            {displayName && <UserAvatar name={displayName} onClick={toggleModal} />}
            {showModal && <UserModal name={displayName} email={email} onLogout={onLogout} onClose={toggleModal} />}
        </div>

    );
};

export default Header;
