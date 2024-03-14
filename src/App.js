import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Menu from './components/Menu';
import Item from './components/Item';
import Footer from './components/Footer';
import Login from './components/Login';
import appStore from './utils/appStore';
import { Provider } from 'react-redux';

function App() {
  return (

    <Provider store = {appStore}>

      <div className="App">

        <Header />

        <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<h1>About US</h1>} />
              <Route path='/reviews' element={<h1>Reviews</h1>} />
              <Route path='/menu' element={<Menu/>} />
              <Route path='/menu/item' element={<Item/>} />
              <Route path='*' element={<Navigate to='/' />} />
              <Route path='/login' element={<Login/>} />
            </Routes>
        </main>

        <Footer/>

      </div>

    </Provider>
  );
}

export default App;
