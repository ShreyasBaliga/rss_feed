import React from 'react';

import Modal from '../Modal';

import styles from './index.module.css';

const FeedContent = props => {
    const { content: { title, feedContent }, toggleFeedContent } = props;
    return (
        <Modal title={title} toggleModal={toggleFeedContent} modalClassName={styles.modal} modalContainerClassname={styles.modalContainer} >
            <div className={styles.content}
                dangerouslySetInnerHTML={{ __html: feedContent }}>
            </div>
        </Modal>
    );
}

export default FeedContent;