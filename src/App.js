import Header from './components/Header';
import Home from './components/Home';
import Dishes from './components/Dishes';
import About from './components/About';
import Reviews from './components/Reviews';

import './App.css';

function App() {
  return (
    <div className="App">

      <Header/>
      <main>
        <div id='home'>
          <Home />
        </div>
        <div id='dishes'>
          <Dishes />
        </div>
        <div id='about'>
          <About />
        </div>
        <div id='reviews'>
          <Reviews />
        </div>
      </main>
    </div>
  );
}

export default App;
