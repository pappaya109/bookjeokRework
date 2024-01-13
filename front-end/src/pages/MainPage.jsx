import React, { useContext } from 'react';
import { modalStore } from '../App';

const Mainpage = () => {
    const { showModal, setShowModal } = useContext(modalStore);
    return (
        <div>
            <button onClick={()=> setShowModal(true)}>Login</button>
            Mainpage
        </div>
    )
}

export default Mainpage