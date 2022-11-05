import React from 'react';
import styles from './index.module.css';

const Input = props => {
    const { containerClassname, label, ...rest } = props;
    return (
        <div className={containerClassname}>
            <label className={styles.label}>{label}</label>
            <input
                className={styles.input}
                {...rest}
            />
        </div>
    );
};

export default Input;
