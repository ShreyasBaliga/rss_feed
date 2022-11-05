import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../Button';
import Input from '../Input';
import Modal from '../Modal';

import { addFeed } from '../../store/slices/feedsSlice';

import styles from './index.module.css';

const ManageFeeds = props => {
    const { toggleManageFeeds } = props;

    const [name, setName] = useState("");
    const [url, setURL] = useState("");

    const dispatch = useDispatch();
    const { uid } = useSelector(state => state.user);

    function handleFeedName(e) {
        setName(e.target.value);
    }
    function handleFeedURL(e) {
        setURL(e.target.value.trim());
    }

    function handleSubmit(e) {
        dispatch(addFeed({ name, url, bookmarked: false, uid }));
        setName("")
        setURL("");
        toggleManageFeeds();
        e.preventDefault();
    }

    function handleCancel(e) {
        e.preventDefault();
        toggleManageFeeds();
    }

    return (
        <Modal title='Manage Feeds' toggleModal={toggleManageFeeds} style={{ height: 'max-content' }}>
            <form onSubmit={handleSubmit}>
                <Input
                    label='Name'
                    id="feedName"
                    placeholder="Enter a valid Feed Name"
                    value={name}
                    onChange={handleFeedName}
                    minLength="2"
                    maxLength="25"
                    required
                    autoComplete='off'
                    containerClassname={styles.inputContainer}
                />
                <Input
                    label='URL'
                    id="feedURL"
                    placeholder="Enter a valid Feed URL"
                    value={url}
                    onChange={handleFeedURL}
                    minLength="10"
                    maxLength="100"
                    required
                    autoComplete='off'
                    title="custom name for feed URL"
                    containerClassname={styles.inputContainer}
                />
                <div className={styles.buttonGroup}>
                    <Button text='Cancel' primary={false} onClick={handleCancel} style={{ marginRight: 10 }} />
                    <Button type="Submit" text='Add' onClick={handleSubmit} />
                </div>
            </form>
        </Modal>
    );
}

export default ManageFeeds;