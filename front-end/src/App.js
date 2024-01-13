import "./App.css";
import { Route, Routes } from "react-router-dom";
import JoinPage from "./pages/JoinPage";
import Mainpage from "./pages/MainPage";
import ListPage from "./pages/Question/ListPage";
import WritePage from "./pages/Question/WritePage";
import DetailPage from "./pages/Question/DetailPage";
import { createContext, useState } from "react";
import ModalLogin from "./components/common/ModalLogin/ModalLogin";
export const modalStore = createContext();


function App() {
  const [showModal, setShowModal] = useState(false)
  return (
    <div>
      <modalStore.Provider value={{showModal, setShowModal}}>
        {
          showModal &&
          <ModalLogin/>
        }
        <Routes>
          <Route path='/' element={<Mainpage />}></Route>
          <Route path='/qna' element={<ListPage />}></Route>
          <Route path='/qna_write' element={<WritePage />}></Route>
          <Route path='/qna_detail' element={<DetailPage />}></Route>
        </Routes>

        <Routes>
          <Route path='/join' element={<JoinPage />}></Route>
        </Routes>
      </modalStore.Provider>
    </div>
  );
}

export default App;
