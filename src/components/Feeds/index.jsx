import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';

import { deleteFeed, getFeeds, updateFeed } from '../../store/slices/feedsSlice';

import ManageFeeds from '../ManageFeeds';
import FeedCard from '../FeedCard';
import Button from '../Button';
import Spinner from '../Spinner';

import styles from './index.module.css';

export default function Feeds() {
    const [showManageFeeds, setShowManageFeeds] = useState(false);
    const [editData, setEditData] = useState(null);
    const [showFavorite, setShowFavrite] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { uid } = useSelector(state => state.user);
    const { entities, status } = useSelector(state => state.feeds);

    const filteredFeedIds = useMemo(() => {
        const feedIds = Object.keys(entities);
        if (showFavorite) {
            return feedIds.filter(key => entities[key].bookmarked);
        }
        return feedIds;
    }, [entities, showFavorite]);

    useEffect(() => {
        dispatch(getFeeds(uid))
    }, [uid, dispatch])

    const toggleManageFeeds = () => {
        if (showManageFeeds && editData) setEditData(null);
        setShowManageFeeds(show => !show)
    };
    const onCardClick = feedId => navigate(`/dashboard/feeds/${feedId}`);
    const onBookmark = (feedId, isBookmarked) => dispatch(updateFeed({ feedId, bookmarked: !isBookmarked }));
    const onEdit = (feedId, name, url) => {
        toggleManageFeeds();
        setEditData({ feedId, name, url });
    }
    const onDelete = feedId => dispatch(deleteFeed(feedId));
    const toggleShowFavorite = () => setShowFavrite(favorite => !favorite);

    if (status === 'loading') return <Spinner />;

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <div style={{ fontWeight: 900, fontSize: 24 }}>
                    My Feed
                    <span>{` (${filteredFeedIds.length})`}</span>
                </div>
                {filteredFeedIds.length > 0 && <Button onClick={toggleManageFeeds}>Add Feed</Button>}
            </div>
            <div className={styles.favoriteButton} onClick={toggleShowFavorite}>
                {!showFavorite && <AiFillStar className={styles.favoriteButtonIcon} />}
                {showFavorite ? 'Show All' : 'Show Favorites'}
            </div>
            <div className={styles.cardsContainer}>
                {filteredFeedIds.length > 0 ? filteredFeedIds.map(key => {
                    const { name, url, bookmarked } = entities[key];
                    return <FeedCard key={key} name={name} url={url} bookmarked={bookmarked} onEdit={() => onEdit(key, name, url)} onDelete={() => onDelete(key)} onBookmark={() => onBookmark(key, bookmarked)} onCardClick={() => onCardClick(key)} />
                }) : <div className={styles.noData}>
                    <span className={styles.noDataMessage}>{`You currently don't have any feeds ${showFavorite ? 'marked as favorites' : 'added'}`}</span>
                    <Button onClick={showFavorite ? toggleShowFavorite : toggleManageFeeds} size='lg' >{showFavorite ? 'Show All' : 'Add Feed'}</Button>
                </div>}
            </div>
            {showManageFeeds && <ManageFeeds editData={editData} toggleManageFeeds={toggleManageFeeds} />}
        </div>
    );
}