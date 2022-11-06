import React, { useState } from "react";
import styles from "./index.module.css";

const Tooltip = props => {
    const { content, children } = props;
    let timeout;
    const [active, setActive] = useState(false);

    const showTip = () => {
        timeout = setTimeout(() => {
            setActive(true);
        }, 400);
    };

    const hideTip = () => {
        clearInterval(timeout);
        setActive(false);
    };

    return (
        <div
            className={styles.container}
            onMouseEnter={showTip}
            onMouseLeave={hideTip}
        >
            {children}
            {active && (
                <div className={styles.tooltip}>
                    {content}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
