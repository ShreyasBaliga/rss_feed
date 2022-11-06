import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../Button';
import Input from '../Input';
import Modal from '../Modal';

import { addFeed, updateFeed } from '../../store/slices/feedsSlice';

import styles from './index.module.css';

const isValidUrl = url => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

const isValidName = name => {
    return /^[a-zA-Z0-9\s\\-]{4,15}$/.test(name);
}

const ManageFeeds = props => {
    const { toggleManageFeeds, editData } = props;
    const { name: currentName = '', url: currentUrl = '', feedId } = editData || {};
    const isEdit = editData !== null;

    const [name, setName] = useState(currentName);
    const [url, setURL] = useState(currentUrl);
    const [dirty, setDirty] = useState(false);

    const [nameError, setNameError] = useState(false);
    const [urlError, setURLError] = useState(false);

    const dispatch = useDispatch();
    const { uid } = useSelector(state => state.user);

    function handleFeedName(e) {
        if (!dirty) setDirty(true);
        const value = e.target.value.trim();
        if(!isValidName(value)) setNameError(true);
        else if(nameError) setNameError(false);
        setName(e.target.value);
    }

    function handleFeedURL(e) {
        if (!dirty) setDirty(true);
        const value = e.target.value.trim();
        if(!isValidUrl(value)) setURLError(true);
        else if(urlError) setURLError(false);
        setURL(e.target.value.trim());
        
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (isEdit) dispatch(updateFeed({ feedId, name, url }));
        else dispatch(addFeed({ name, url, bookmarked: false, uid }));
        toggleManageFeeds();
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
                    autoComplete='off'
                    containerClassname={styles.inputContainer}
                    error={nameError}
                    errorMessage="Please enter a valid Feed Name between 4 to 10 chanracters"
                />
                <Input
                    label='URL'
                    id="feedURL"
                    placeholder="Enter a valid Feed URL"
                    value={url}
                    onChange={handleFeedURL}
                    autoComplete='off'
                    containerClassname={styles.inputContainer}
                    error={urlError}
                    errorMessage="Please enter a valid Feed URL"
                />
                <div className={styles.buttonGroup}>
                    <Button primary={false} onClick={handleCancel} style={{ marginRight: 10 }} >Cancel</Button>
                    <Button onClick={handleSubmit} disabled={nameError || urlError || !dirty}>{isEdit ? 'Update' : 'Add'}</Button>
                </div>
            </form>
        </Modal>
    );
}

export default ManageFeeds;