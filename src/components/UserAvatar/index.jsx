import React from 'react';

import styles from './index.module.css'

const UserAvatar = props => {
    const { name, onClick } = props;
    const avatarName = name[0].toUpperCase();
    return(
        <div className={styles.avatar} onClick={onClick}>{avatarName}</div>
    )
}

export default UserAvatar;