import React from 'react';
import styles from './index.module.css';
import * as AiIcons from 'react-icons/ai';

import Tooltip from '../Tooltip';

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
                    {bookmarked ? <AiIcons.AiFillStar className={styles.actionButton} onClick={onInteralBookmark} /> : <AiIcons.AiOutlineStar className={styles.actionButton} onClick={onInteralBookmark} />}
                </Tooltip>
                <Tooltip content='Edit'>
                    <AiIcons.AiOutlineEdit className={styles.actionButton} onClick={onInteralEdit} />
                </Tooltip>
                <Tooltip content='Delete' direction='top'>
                    <AiIcons.AiOutlineDelete className={styles.actionButton} onClick={onInteralDelete} />
                </Tooltip>
            </div>
        </div>
    )
}

export default FeedCard;
