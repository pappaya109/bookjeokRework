import React from 'react';
import { TagByTechStack } from './TagKeywords'
import { TagByJobGroup } from './TagKeywords'
import { TagByProgramGen } from './TagKeywords'
import { TagByOthers } from './TagKeywords'
import styles from './TagList.module.scss';
import SelectedTag from './SelectedTag';
import Tag from './Tag';

const TagList = ({ tagNames, handleAddTagNameList, filterTagNameList ,tags, handleAddTagList, filterTagList }) => {
    return (
        <section className={styles.tagContainer}>
            <div className={styles.tagWrapper}>
                <div className={styles.tagBlock}>
                    {tagNames.map((tagName, index) => {
                        return (
                            <SelectedTag
                                key={index}
                                tagName={tagName}
                                filterTagnameList={filterTagNameList}
                                filterTagList={filterTagList}
                            />
                        )
                    })}
                </div>
            </div>
            <div className={styles.tagWrapper}>
                <h3 className={styles.tagTitle}>기술 스택</h3>
                <div className={styles.tagBlock}>
                    {TagByTechStack.map((tag) => {
                        return (
                            <Tag
                                key={tag.tag_idx}
                                tagId={tag.tag_idx}
                                tagName={tag.tag_name}
                                tagNames={tagNames}
                                handleAddTagNameList={handleAddTagNameList}
                                handleAddTagList={handleAddTagList}
                            />
                        )
                    })}
                </div>
            </div>
            <div className={styles.tagWrapper}>
                <h3 className={styles.tagTitle}>직무</h3>
                <div className={styles.tagBlock}>
                    {TagByJobGroup.map((tag) => {
                        return (
                            <Tag
                                key={tag.tag_idx}
                                tagId={tag.tag_idx}
                                tagName={tag.tag_name}
                                tagNames={tagNames}
                                handleAddTagNameList={handleAddTagNameList}
                                handleAddTagList={handleAddTagList}
                            />
                        )
                    })}
                </div>
            </div>
            <div className={styles.tagWrapper}>
                <h3 className={styles.tagTitle}>프로그래밍 일반</h3>
                <div className={styles.tagBlock}>
                    {TagByProgramGen.map((tag) => {
                        return (
                            <Tag
                                key={tag.tag_idx}
                                tagId={tag.tag_idx}
                                tagName={tag.tag_name}
                                tagNames={tagNames}
                                handleAddTagNameList={handleAddTagNameList}
                                handleAddTagList={handleAddTagList}
                            />
                        )
                    })}
                </div>
            </div>
            <div className={styles.tagWrapper}>
                <h3 className={styles.tagTitle}>기타</h3>
                <div className={styles.tagBlock}>
                    {TagByOthers.map((tag) => {
                        return (
                            <Tag
                                key={tag.tag_idx}
                                tagId={tag.tag_idx}
                                tagName={tag.tag_name}
                                tagNames={tagNames}
                                handleAddTagNameList={handleAddTagNameList}
                                handleAddTagList={handleAddTagList}
                            />
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default TagList