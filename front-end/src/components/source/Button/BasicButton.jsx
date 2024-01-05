import React from 'react'
import styles from './BasicButton.module.scss';

const BasicButton = ({ title, handleClick }) => {
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

export default BasicButton;