import React from 'react';
import { AiOutlineTwitter, AiFillLinkedin, AiFillFacebook, AiOutlineLink } from 'react-icons/ai';

import PlaceholderImage from '../../assets/images/placeholder.svg';
import styles from './index.module.css';

const formatDate = pubDate => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(pubDate);
    return date.toLocaleDateString("en-US", options);
}

const FeedInfoCard = props => {
    const { title, author, thumbnail, pubDate, guid, onCardClick } = props;
    const onShareClick = e => e.stopPropagation();
    return (
        <div className={styles.card} onClick={onCardClick}>
            <div className={styles.imageContainer} ><img alt={title} className={styles.image} src={thumbnail ? thumbnail : PlaceholderImage} /></div>
            <div className={styles.contentContainer}>
                <span className={styles.title}>{title}</span>
                <div className={styles.authorDateContainer}>
                    <span className={styles.author}>{author}</span>
                    &bull;
                    <span className={styles.date}>{formatDate(pubDate)}</span>
                </div>
                <div className={styles.shareButtonGroup}>
                    <a href={`https://twitter.com/intent/tweet?url=${guid}`}
                        target="_blank" rel="noopener noreferrer" className={styles.shareButton}>
                        <AiOutlineTwitter className={styles.shareButtonLink} onClick={onShareClick} />
                    </a>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${guid}`}
                        target="_blank" rel="noopener noreferrer" className={styles.shareButton}>
                        <AiFillLinkedin className={styles.shareButtonLink} onClick={onShareClick} />
                    </a>
                    <a href={`https://www.facebook.com/sharer.php?u=${guid}`}
                        target="_blank" rel="noopener noreferrer" className={styles.shareButton}>
                        <AiFillFacebook className={styles.shareButtonLink} onClick={onShareClick} />
                    </a>
                    <a href={guid} target="_blank" rel="noopener noreferrer" className={styles.shareButton}>
                        <AiOutlineLink className={styles.shareButtonLink} onClick={onShareClick} />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default FeedInfoCard;
