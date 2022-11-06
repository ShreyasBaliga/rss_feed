import React from 'react';

import styles from './index.module.css';

const Button = props => {
    const { children, primary = true, className, size = 'sm', disabled, ...rest } = props;
    return (
        <div className={disabled ? styles.containerDisabled : ''}>
            <button
                className={`${styles.button} ${primary ? styles.primary : styles.secondary} ${disabled ? styles.disabled : ''} ${className} ${styles[size]}`}
                {...rest}>
                {children}
            </button>
        </div>
    );
};

export default Button;
