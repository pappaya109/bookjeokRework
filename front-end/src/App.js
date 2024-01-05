import "./App.css";
import { Route, Routes } from "react-router-dom";
import JoinPage from "./pages/JoinPage";
import Mainpage from "./pages/MainPage";
import ListPage from "./pages/Question/ListPage";
import WritePage from "./pages/Question/WritePage";
import DetailPage from "./pages/Question/DetailPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Mainpage />}></Route>
        <Route path='/qna' element={<ListPage />}></Route>
        <Route path='/qna_write' element={<WritePage />}></Route>
        <Route path='/qna_detail' element={<DetailPage />}></Route>
      </Routes>

      <Routes>
        <Route path='/join' element={<JoinPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
