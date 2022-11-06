import React from 'react';
import { useNavigate } from 'react-router-dom';

import NotFoundImage from '../../assets/images/404.svg';
import styles from './index.module.css';
import Button from '../Button';

const NotFound = () => {
    const navigate = useNavigate();
    const onDashboardButtonClick = () => navigate('/dashboard/feeds');

    return (
        <div className={styles.container}>
            <img className={styles.image} src={NotFoundImage} />
            <Button onClick={onDashboardButtonClick}>
                Go to Dashboard
            </Button>
        </div>
    );
};

export default NotFound;
