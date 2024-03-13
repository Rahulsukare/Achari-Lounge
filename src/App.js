import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';

import { Navigate, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';

function App() {
  return (
    <div className="App">

      <Header />

      <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<h1>About US</h1>} />
            <Route path='/reviews' element={<h1>Reviews</h1>} />
            <Route path='/menu' element={<Menu/>} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
      </main>

      <Footer/>

    </div>
  );
}

export default App;
