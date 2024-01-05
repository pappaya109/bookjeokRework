import React from 'react'
import styles from './Tag.module.scss'



// import classNames from 'classnames/bind'
// const cn = classNames.bind(styles);

const Tag = ({ tagId, tagName, tagNames, handleAddTagNameList, handleAddTagList }) => {
  const isInclude = tagName && tagNames.includes(tagName);
  return (
    <div 
      // className={`${styles.tagTitle} ${styles.isInclude && 'tagTitle--include'}`} 
      className={`${styles.tagTitle} ${styles.isInclude && 'tagTitle--include'}`} 
      onClick={
        () => {
          if (isInclude)
            return ;
          handleAddTagList(tagId, tagName);
          handleAddTagNameList(tagName)
        }}>
      {tagName}
    </div>
  )
}

export default Tag