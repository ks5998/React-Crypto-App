import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Coinpage from './pages/Coinpage';

function App() {

  return (
    <div className='app'>
    <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Homepage/>} exact/>
          <Route path='/coins/:id' element={<Coinpage/>} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
