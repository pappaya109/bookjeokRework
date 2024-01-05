import React from 'react'
import styles from './OutlineButton.module.scss';

const OutlineButton = ({ title, handleClick }) => {
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

export default OutlineButton