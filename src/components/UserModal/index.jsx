import React from 'react';
import { BiLogOut } from 'react-icons/bi';

import UserAvatar from '../UserAvatar';

import styles from './index.module.css'

const UserModal = props => {
    const { name, email, onLogout, onClose } = props;
    return (
        <div className={styles.background} onClick={onClose}>
            <div className={styles.container}>
                <UserAvatar name={name} />
                <span className={styles.name}>{name.toUpperCase()}</span>
                <span className={styles.email}>{email}</span>
                <span className={styles.separator} />
                <span className={styles.logout} onClick={onLogout}>
                    <BiLogOut className={styles.logoutIcon} />
                    Logout
                </span>
            </div>
        </div>
    )
}

export default UserModal;