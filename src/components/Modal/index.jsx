import React from "react";
import { MdClose } from 'react-icons/md';

import styles from "./index.module.css";

const  Modal = props => {
    const { title, toggleModal, children, style, modalClassName, modalContainerClassname } = props;

    return (
        <div className={`${styles.modalBackground} ${modalContainerClassname}`}>
            <div className={`${styles.modalContainer} ${modalClassName}`} style={style}>
                <div className={styles.titleContainer}>
                    <span className={styles.title}>{title}</span>
                    <MdClose className={styles.closeButton} onClick={toggleModal} />
                </div>
                {children}
            </div>
        </div>
    );
}

export default Modal;