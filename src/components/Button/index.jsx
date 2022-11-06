import React from 'react';
import styles from './index.module.css';

const Button = props => {
    const { children, primary = true, className, size = 'sm', ...rest } = props;
    return (
        <button className={`${styles.button} ${primary ? styles.primary : styles.secondary} ${className} ${styles[size]}`} {...rest}>
            {children}
        </button>
    );
};

export default Button;
