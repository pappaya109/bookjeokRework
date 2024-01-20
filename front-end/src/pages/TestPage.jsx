import React, { useEffect } from 'react';
import axios from 'axios';

const TestPage = () => {
    const handleAPI = () => {
        axios.post('http://localhost:3002/question/postQuestion')
        .then((res)=> {
            console.log(res)
        })
        
    }

    return (
        <div>
            <button onClick={handleAPI}>call API</button>
        </div>
    )
}

export default TestPage