import React from 'react';
import styles from './SelectedTag.module.scss';

const SeletedTag = ({ tagName, filterTagnameList, filterTagList }) => {
  return (
    <div
      className={styles.tagTitle} 
      onClick={() => {
        filterTagList(tagName);
        filterTagnameList(tagName)
      }}>
      {tagName}
    </div>
  )
}

export default SeletedTag