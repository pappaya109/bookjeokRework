import React from 'react'
import styles from './TextButton.module.scss'

const TextButton = ({ title, handleClick }) => {
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

export default TextButton