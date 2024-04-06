import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
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

import axios from 'axios';
import Contact from './components/Contact';

function App() {

  const location = useLocation();
  const [name, setName] = useState('');
  const [email, setemail] = useState('')
  const [fullName, setfullName] = useState('')
  const [address, setaddress] = useState('');
  const [phoneNumber, setphoneNumber] = useState('')
  const [cartItemCount, setCartItemCount] = useState(0);

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

  });

  // Check if current route is login page
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="App">
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
            <Route path='/success' element={<div className="bg-green-100 rounded-lg p-6 shadow-md">
              <h2 className="text-green-700 text-2xl font-bold mb-4">Order Placed Successfully!</h2>
              <p className="text-gray-700">Thank you for your order. We have received your order and it is being processed. You will receive a confirmation email shortly.</p>
            </div>} />
            <Route path='/failed' element={<div className="bg-red-100 rounded-lg p-6 shadow-md">
              <h2 className="text-red-700 text-2xl font-bold mb-4">Order Failed</h2>
              <p className="text-gray-700">We apologize, but there was an issue processing your order. Please try again later or contact support for assistance.</p>
            </div>} />
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
