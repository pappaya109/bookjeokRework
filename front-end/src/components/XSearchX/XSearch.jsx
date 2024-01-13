import React from 'react';
import styles from '@/components/common/Search/Search.module.scss';
import OutlineInput from '@/components/source/Input/OutlineInput';
const Search = () => {
    
    return (
        <div style={{
            margin: 'auto',
            marginTop: '1em',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            // flexGrow: '3'
            }}>
            <form>
                
                <OutlineInput />
            </form>
        </div>   
    )
}

export default Search;