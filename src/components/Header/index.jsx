import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import UserAvatar from '../UserAvatar';
import UserModal from '../UserModal';
import Logo from '../Logo';

import { logOut } from '../../services/firebase';

import styles from './index.module.css';

const Header = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [showModal, setShowModal] = useState(false);
    const { displayName, email } = useSelector(state => state.user);

    const onLogout = async () => {
        await logOut();
        navigate('/login');
    };

    const onClickLogo = async () => {
        if (pathname !== '/dashboard/feeds') navigate('/dashboard/feeds');
    };

    const toggleModal = () => setShowModal(modal => !modal);

    return (
        <div className={styles.header}>
            <Logo onClick={onClickLogo} />
            {displayName && <UserAvatar name={displayName} onClick={toggleModal} />}
            {showModal && <UserModal name={displayName} email={email} onLogout={onLogout} onClose={toggleModal} />}
        </div>

    );
};

export default Header;
