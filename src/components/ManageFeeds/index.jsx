import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../Button';
import Input from '../Input';
import Modal from '../Modal';

import { addFeed, updateFeed } from '../../store/slices/feedsSlice';

import styles from './index.module.css';

const ManageFeeds = props => {
    const { toggleManageFeeds, editData } = props;
    const { name: currentName = '', url: currentUrl = '', feedId } = editData || {};
    const isEdit = editData !== null;

    const [name, setName] = useState(currentName);
    const [url, setURL] = useState(currentUrl);

    const dispatch = useDispatch();
    const { uid } = useSelector(state => state.user);

    function handleFeedName(e) {
        setName(e.target.value);
    }
    function handleFeedURL(e) {
        setURL(e.target.value.trim());
    }

    function handleSubmit(e) {
        if (isEdit) dispatch(updateFeed({ feedId, name, url }));
        else dispatch(addFeed({ name, url, bookmarked: false, uid }));
        toggleManageFeeds();
        e.preventDefault();
    }

    function handleCancel(e) {
        e.preventDefault();
        toggleManageFeeds();
    }

    return (
        <Modal title={`${isEdit ? 'Edit' : 'Add'} Feed`} toggleModal={toggleManageFeeds} style={{ height: 'max-content' }}>
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
                    <Button primary={false} onClick={handleCancel} style={{ marginRight: 10 }} >Cancel</Button>
                    <Button type="Submit" onClick={handleSubmit}>{isEdit ? 'Update' : 'Add'}</Button>
                </div>
            </form>
        </Modal>
    );
}

export default ManageFeeds;