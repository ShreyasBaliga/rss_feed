import React from 'react';
import { AiFillStar, AiOutlineStar, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

import Tooltip from '../Tooltip';

import styles from './index.module.css';

const FeedCard = props => {
    const { name, url, bookmarked, onBookmark, onEdit, onDelete, onCardClick } = props;
    const avatarName = name[0].toUpperCase();

    const onInteralBookmark = event => {
        event.stopPropagation();
        onBookmark();
    }

    const onInteralDelete = event => {
        event.stopPropagation();
        onDelete();
    }

    const onInteralEdit = event => {
        event.stopPropagation();
        onEdit();
    }

    return (
        <div className={styles.card} onClick={onCardClick}>
            <div className={styles.avatar}>{avatarName}</div>
            <div className={styles.contentContainer}>
                <span className={styles.name}>{name}</span>
                <span className={styles.url}>{url}</span>
            </div>
            <div className={styles.actionButtonContainer}>
                <Tooltip content={`${bookmarked ? 'Remove from' : 'Add to'} Favourites`}>
                    {bookmarked ? <AiFillStar className={styles.actionButton} onClick={onInteralBookmark} /> : <AiOutlineStar className={styles.actionButton} onClick={onInteralBookmark} />}
                </Tooltip>
                <Tooltip content='Edit'>
                    <AiOutlineEdit className={styles.actionButton} onClick={onInteralEdit} />
                </Tooltip>
                <Tooltip content='Delete' direction='top'>
                    <AiOutlineDelete className={styles.actionButton} onClick={onInteralDelete} />
                </Tooltip>
            </div>
        </div>
    )
}

export default FeedCard;
