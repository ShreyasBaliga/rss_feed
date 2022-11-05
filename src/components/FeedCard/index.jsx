import React from 'react';
import styles from './index.module.css';
import * as AiIcons from 'react-icons/ai';

const FeedCard = props => {
    const { name, url, bookmarked, onBookmark, onEdit, onDelete, onCardClick } = props;
    const avatarName = name[0].toUpperCase();

    return (
        <div className={styles.card} onClick={onCardClick}>
            <div className={styles.avatar}>{avatarName}</div>
            <div className={styles.contentContainer}>
                <span className={styles.name}>{name}</span>
                <span className={styles.url}>{url}</span>
            </div>
            <div className={styles.actionButtonContainer}>
                {bookmarked ? <AiIcons.AiFillStar className={styles.actionButton} onClick={onBookmark} /> : <AiIcons.AiOutlineStar className={styles.actionButton} onClick={onBookmark} />}
                <AiIcons.AiOutlineEdit className={styles.actionButton} onClick={onEdit} />
                <AiIcons.AiOutlineDelete className={styles.actionButton} onClick={onDelete} />
            </div>
        </div>
    )
}

export default FeedCard;
