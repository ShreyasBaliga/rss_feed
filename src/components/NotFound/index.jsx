import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../Button';

import NotFoundImage from '../../assets/images/404.svg';
import styles from './index.module.css';

const NotFound = () => {
    const navigate = useNavigate();
    const onDashboardButtonClick = () => navigate('/dashboard/feeds');

    return (
        <div className={styles.container}>
            <img alt='404' className={styles.image} src={NotFoundImage} />
            <Button size='lg' onClick={onDashboardButtonClick}>
                Go to Dashboard
            </Button>
        </div>
    );
};

export default NotFound;
