import React from 'react'
import styles from './OutlineInput.module.scss';

const BasicInput = ({ input, placeholder, updateInput, submitInput, btnTxt }) => {
  return (
    <form className={styles.inputContainer}>
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        onChange={(event) => updateInput(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            console.log(input)
            submitInput(input);
          }
        }}
      />
      <button 
        className={styles.submitButton}
        onClick={() => submitInput(input)}>
        {btnTxt}
      </button>
    </form>
  )
}

export default BasicInput