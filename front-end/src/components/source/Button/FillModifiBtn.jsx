import React from 'react'
import styles from './FillModifiBtn.module.scss';

const FillModifiBtn = ({ title, handleClick }) => {
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

export default FillModifiBtn