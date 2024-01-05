import './App.css';
import { Route, Routes } from 'react-router-dom';
import JoinPage from './pages/JoinPage';
import Mainpage from './pages/MainPage';


function App() {
  return (
   <div>
    <Routes>
      <Route path='/' element={<Mainpage/>}></Route>
    </Routes>
    
    <Routes>
      <Route path='/join' element={<JoinPage/>}></Route>
    </Routes>
    
   </div>
  );
}

export default App;
