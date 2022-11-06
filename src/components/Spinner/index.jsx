import React from 'react';

import styles from './index.module.css';

const Spinner = () => (
    <div className={styles.container} >
        <div className={styles.loader} />
    </div>  
);

export default Spinner;
