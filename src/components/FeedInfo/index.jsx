import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as MdIcons from 'react-icons/md';

import FeedInfoCard from '../FeedInfoCard';
import FeedContent from '../FeedContent';

import { getFeedInfo } from '../../store/slices/feedsSlice';
import styles from './index.module.css';

export default function FeedInfo() {
    const [content, setContent] = useState(null);

    const { feedId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { entities, feedInfo } = useSelector(state => state.feeds);
    const feedData = entities[feedId];

    const { feed, items } = feedInfo;

    useEffect(() => {
        const { url } = feedData;
        dispatch(getFeedInfo(url));
    }, []);

    const onGoBack = () => navigate(-1);

    const unsetContent = () => setContent(null);

    const onCardClick = (title, feedContent) => setContent({ title, feedContent });

    if (feed) {
        return (
            <div className={styles.container}>
                <div className={styles.title}>
                    <MdIcons.MdOutlineKeyboardBackspace className={styles.backButton} onClick={onGoBack} />
                    <div style={{ fontWeight: 900, fontSize: 24 }}>
                        {feed.title}
                        <span>{`(${items.length})`}</span>
                    </div>
                </div>
                <div className={styles.cardsContainer}>
                    {items.map(data => {
                        const { title, author, thumbnail, pubDate, link, content: feedHtmlContent } = data;
                        return <FeedInfoCard title={title} author={author} thumbnail={thumbnail} pubDate={pubDate} link={link} onCardClick={() => onCardClick(title, feedHtmlContent)} />
                    })}
                </div>
                {content && <FeedContent content={content} toggleFeedContent={unsetContent} />}
            </div>
        );
    }
}