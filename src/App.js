import { BrowserRouter, Routes, Route } from 'react-router-dom';

import "react-datepicker/dist/react-datepicker.css";

import Home from './pages/Home';
import Details from './pages/Details';
import './styles.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='details/:id' element={<Details/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
