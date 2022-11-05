import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getFeeds } from '../../store/slices/feedsSlice';

import ManageFeeds from '../ManageFeeds';
import FeedCard from '../FeedCard';
import Button from '../Button';

import styles from './index.module.css';

export default function Feeds() {
    const [showManageFeeds, setShowManageFeeds] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { uid } = useSelector(state => state.user);
    const { entities } = useSelector(state => state.feeds);
    const feedIds = Object.keys(entities);

    useEffect(() => {
        dispatch(getFeeds(uid))
    }, [uid, dispatch])

    const toggleManageFeeds = () => setShowManageFeeds(show => !show);
    const onCardClick = feedId => navigate(`/dashboard/feeds/${feedId}`);

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <div style={{ fontWeight: 900, fontSize: 24 }}>
                    My Feed
                    <span>{`(${feedIds.length})`}</span>
                </div>
                <Button text='Manage Feeds' onClick={toggleManageFeeds} />
            </div>
            <div className={styles.cardsContainer}>
                {feedIds && feedIds.map(key => {
                    const { name, url, bookmarked } = entities[key];
                    return <FeedCard key={key} name={name} url={url} bookmarked={bookmarked} onCardClick={() => onCardClick(key)} />
                })}
            </div>
            {showManageFeeds && <ManageFeeds toggleManageFeeds={toggleManageFeeds} />}
        </div>
    );
}