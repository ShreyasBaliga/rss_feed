import React from "react";
import styles from "./index.module.css";
import { MdClose } from 'react-icons/md';


const  Modal = props => {
    const { title, toggleModal, children, style } = props;

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContainer} style={style}>
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