import React from 'react';
import styles from './index.module.css';

const Button = props => {
    const { text, primary = true, className, ...rest } = props;
    return (
        <button className={`${styles.button} ${primary ? styles.primary : styles.secondary} ${className}`} {...rest}>
            {text}
        </button>
    );
};

export default Button;
