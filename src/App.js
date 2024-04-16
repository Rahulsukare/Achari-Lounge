import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Home from './components/Home';
import Menu from './components/Menu';
import Item from './components/Item';
import Cart from './components/Cart';
import Login from './components/Login';
import Profile from './components/Profile';
import OrdersStatus from './components/OrdersStatus';
import About from './components/About';
import Footer from './components/Footer';
import Contact from './components/Contact';
import OrderSuccess from './components/OrderSuccess';
import OrderFailed from './components/OrderFailed';

import { BiUpArrowAlt } from "react-icons/bi";

function App() {

  const location = useLocation();
  const [name, setName] = useState('');
  const [email, setemail] = useState('')
  const [fullName, setfullName] = useState('')
  const [address, setaddress] = useState('');
  const [phoneNumber, setphoneNumber] = useState('')
  const [cartItemCount, setCartItemCount] = useState(0);
  const [showScrollUp, setShowScrollUp] = useState(false);

  useEffect(() => {

    const fetchUser = async () => {
      try {
        if (localStorage.getItem("auth-token")) {
          let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_HOST_URL}/auth/getUser`,
            headers: {
              'Content-Type': 'application/json',
              'auth-token': `${localStorage.getItem('auth-token')}`,
            }
          };
          axios.request(config)
            .then(response => {
              const fullName = response.data.name;
              const firstName = fullName.split(" ")[0];
              setName(firstName)
              setfullName(response.data.name)
              setemail(response.data.email)
              setaddress(response.data.address)
              setphoneNumber(response.data.phoneNumber)
              setCartItemCount(response.data.cart.length)
              console.log(response.data.name)
              console.log(response.data.cart.length)
            })
            .catch(error => {
              console.log(error)
            });
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchUser();

    const handleScroll = () => {
      if (window.scrollY === 0) {
        setShowScrollUp(false);
      } else {
        setShowScrollUp(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  });


  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Check if current route is login page
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="App relative">
      {showScrollUp && localStorage.getItem('auth-token') && (
        <BiUpArrowAlt 
          id='scrollUp'
          className='fixed bottom-5 right-5 w-8 h-8 p-2 sm:w-10 sm:h-10 sm:p-3 md:w-12 md:h-12 md:p-3 border text-[#D12525] border-[#D12525] rounded-full z-50 cursor-pointer animate-popup' onClick={scrollUp}
        />
      )}

      {!(localStorage.getItem('auth-token')) ? (<><Login /></>) : (<>

        {/* Conditionally render Header based on whether user is on login page */}
        {!isLoginPage && <Header userName={name || "UserName"} cartItemCount={cartItemCount || 0} />}
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/item/:name' element={<Item />} />
            <Route path='/cart' element={<Cart userName={fullName} email={email} address={address} phoneNumber={phoneNumber} />} />
            <Route path='/orders' element={<OrdersStatus />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/about' element={<About />} />
            <Route path='/success' element={<OrderSuccess />} />
            <Route path='/failed' element={<OrderFailed />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </main>
        {!isLoginPage && <Footer />}
      </>)}
    </div>
  );
}

export default App;
