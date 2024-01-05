import React from 'react'
import styles from './FillButton.module.scss';

const FillButton = ({ title, handleClick }) => {
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

export default FillButton