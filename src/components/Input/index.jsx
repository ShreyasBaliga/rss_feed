import React from 'react';

import styles from './index.module.css';

const Input = props => {
    const { containerClassname, label, error, errorMessage , ...rest } = props;
    return (
        <div className={containerClassname}>
            <label className={styles.label}>{label}</label>
            <input
                className={`${styles.input} ${error ? styles.error : ''}`}
                {...rest}
            />
            {error && <span className={styles.errorMessage}>{errorMessage}</span>}
        </div>
    );
};

export default Input;
