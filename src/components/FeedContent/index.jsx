import React from 'react';

import Modal from '../Modal';

import styles from './index.module.css';

const FeedContent = props => {
    const { content: { title, feedContent }, toggleFeedContent } = props;
    return (
        <Modal title={title} toggleModal={toggleFeedContent} style={{ height: '90%', width: '100%', borderRadius: 0, marginTop: 65, maxWidth: '100%' }}>
            <div className={styles.content}
                dangerouslySetInnerHTML={{ __html: feedContent }}>
            </div>
        </Modal>
    );
}

export default FeedContent;