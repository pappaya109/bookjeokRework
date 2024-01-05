import React from 'react'
import styles from './OutModifiBtn.module.scss';

const OutModifiBtn = ({ title, handleClick }) => {
    return (
        <button
            className={styles.buttonContainer}
            onClick={() => handleClick(title)}>
            <span className={styles.buttonTitle}>
                {title}
            </span>
        </button>
    )
}

export default OutModifiBtn