import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Menu from './components/Menu';
import Item from './components/Item';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Login from './components/Login';
import Profile from './components/Profile';
import About from './components/About';

import axios from 'axios';

import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";

function App() {
  const dispatch = useDispatch();
  const name = useSelector(state => state.user?.name);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'http://localhost:8001/auth/getUser',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': `${localStorage.getItem('auth-token')}`,
          }
        };
        axios.request(config)
          .then(response => {
            dispatch(addUser(response.data));
          })
          .catch(error => {
            console.log(error)
          });
      } catch (error) {
        console.error(error);
      }
    }

    fetchUser();
  }, [dispatch]);

  return (
    <div className="App">
      <Header userName={name || "UserName"} />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<h1>Contact</h1>} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/item/:name' element={<Item />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
