import "./App.css";
import { Route, Routes } from "react-router-dom";
import JoinPage from "./pages/JoinPage";
import Mainpage from "./pages/MainPage";
import ListPage from "./pages/Question/ListPage";
import WritePage from "./pages/Question/WritePage";
import DetailPage from "./pages/Question/DetailPage";
import { createContext, useState } from "react";
import ModalLogin from "./components/common/ModalLogin/ModalLogin";
import TestPage from "./pages/TestPage";
import MyPage from './pages/My/MyPage'

export const modalStore = createContext();


function App() {
  const [showModal, setShowModal] = useState(false)
  const [isLogined, setIsLogined] = useState(false);
  return (
    <div>
      <modalStore.Provider value={{showModal, setShowModal, isLogined, setIsLogined}}>
        {
          showModal &&
          <ModalLogin/>
        }
        <Routes>
          <Route path='/' element={<Mainpage />}></Route>
          <Route path='/qna' element={<ListPage />}></Route>
          <Route path='/qna_write' element={<WritePage />}></Route>
          <Route path='/qna_detail' element={<DetailPage />}></Route>
          <Route path='/test' element={<TestPage/>}></Route>
        </Routes>

        <Routes>
          <Route path='/join' element={<JoinPage />}></Route>
        </Routes>
        <Routes>
          <Route path="/my" element={<MyPage/>}></Route>
          {/* <Route path="/my/" element={}></Route> */}
        </Routes>
        
      </modalStore.Provider>
    </div>
  );
}

export default App;
