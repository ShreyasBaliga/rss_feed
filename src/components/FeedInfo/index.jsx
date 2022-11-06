import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';

import FeedInfoCard from '../FeedInfoCard';
import FeedContent from '../FeedContent';
import Spinner from '../Spinner';

import { getFeedInfo, getFeed } from '../../store/slices/feedsSlice';

import styles from './index.module.css';

export default function FeedInfo() {
    const [content, setContent] = useState(null);

    const { feedId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { entities, feedInfo, status } = useSelector(state => state.feeds);
    const { feed, items } = feedInfo;

    useEffect(() => {
        const feedData = entities[feedId];
        if (!feedData) {
            dispatch(getFeed(feedId))
                .then(unwrapResult)
                .catch(err => {
                    if (err.name === 'TypeError') navigate('/not-found', { replace: true });
                });
        } else {
            const { url } = feedData;
            dispatch(getFeedInfo(url));
        }
    }, [entities, dispatch, feedId, navigate]);

    const onGoBack = () => navigate(-1);

    const unsetContent = () => setContent(null);

    const onCardClick = (title, feedContent) => setContent({ title, feedContent });

    if (status === 'loading') return <Spinner />;

    if (feed) {
        return (
            <div className={styles.container}>
                <div className={styles.title}>
                    <MdOutlineKeyboardBackspace className={styles.backButton} onClick={onGoBack} />
                    <div className={styles.titleText}>
                        {feed.title}
                        <span>{` (${items.length})`}</span>
                    </div>
                </div>
                <div className={styles.cardsContainer}>
                    {items.map(data => {
                        const { title, author, thumbnail, pubDate, link, content: feedHtmlContent, guid, categories } = data;
                        return <FeedInfoCard
                            key={title}
                            guid={guid}
                            categories={categories}
                            title={title} author={author}
                            thumbnail={thumbnail}
                            pubDate={pubDate}
                            link={link}
                            onCardClick={() => onCardClick(title, feedHtmlContent)} />;
                    })}
                </div>
                {content && <FeedContent content={content} toggleFeedContent={unsetContent} />}
            </div>
        );
    }
}