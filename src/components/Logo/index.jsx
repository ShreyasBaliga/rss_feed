import React from 'react';

import styles from './index.module.css';

const Logo = props => {
    const { onClick } = props;
    return <span onClick={onClick} className={styles.logo}><span className={styles.first}>RSS</span>Viewer</span>;
}

export default Logo;