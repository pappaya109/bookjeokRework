import './App.css';
import { Route, Routes } from 'react-router-dom';
import JoinPage from './pages/JoinPage';


function App() {
  return (
   <div>
    <Routes>
      {/* <Route path='/' ></Route> */}
      <Route path='/join' element={<JoinPage/>}></Route>
    </Routes>
   </div>
  );
}

export default App;
