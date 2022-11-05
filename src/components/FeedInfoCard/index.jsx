import React from 'react';
import styles from './index.module.css';


const FeedInfoCard = props => {
    const { title, author, thumbnail, pubDate, onCardClick } = props;
    return (
        <div className={styles.card} onClick={onCardClick}>
            <div className={styles.imageContainer} ><img alt={title} className={styles.image} src={thumbnail} /></div>
            <div className={styles.contentContainer}>
                <span className={styles.title}>{title}</span>
                <div className={styles.authorDateContainer}>
                    <span className={styles.author}>{author}</span>
                    &bull;
                    <span className={styles.date}>{pubDate}</span>
                </div>
            </div>
        </div>
    )
}

export default FeedInfoCard;
