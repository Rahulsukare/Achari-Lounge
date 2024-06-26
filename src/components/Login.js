import React, { useRef, useState } from "react";
import axios from 'axios';
import { checkValidData } from "../utils/Validate";

import { useNavigate } from "react-router";
// import { useDispatch } from "react-redux";
// import { addUser } from "../utils/userSlice";
import { Link } from "react-router-dom";
import BrandLogo from '../Assets/RestLogo.png'
import { BiHide, BiShow } from "react-icons/bi";

const Login = () => {
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(false);
    const [toggle, setToggle] = useState(false);
    const name = useRef(null);
    const email = useRef(null);
    const phoneNumber = useRef(null);
    const address = useRef(null);
    const password = useRef(null);
    const toggleSignIn = () => {
        setIsSignInForm(!isSignInForm);
        setErrorMessage(null);
    }
    const handleButtonClick = async () => {
        setLoading(true)
        //validate the form data
        const msg = checkValidData(email.current.value, password.current.value);
        setErrorMessage(msg);

        if (msg) {
            setLoading(false)
            return;
        }
        //sign In/ Sign Up
        if (isSignInForm === false) {
            // Sign Up Logic
            try {
                const signUpData = {
                    name: name.current.value,
                    email: email.current.value,
                    password: password.current.value,
                    phoneNumber: phoneNumber.current.value,
                    address: address.current.value
                };

                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: `${process.env.REACT_APP_HOST_URL}/auth/signup`,
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `${localStorage.getItem('auth')}`,
                    },
                    data: signUpData
                };

                axios.request(config)
                    .then(response => {
                        // Handle successful signup response
                        console.log('User signed up successfully:', response.data);
                        alert("User signed up successfully");
                        setLoading(false)
                        // Optionally, you can perform any actions upon successful signup
                    })
                    .catch(error => {
                        // Handle signup error
                        if (error.response) {
                            console.error('Server responded with an error:', error.response.data);
                        } else if (error.request) {
                            console.error('No response received from the server:', error.request);
                        } else {
                            console.error('Error setting up the request:', error.message);
                        }
                        // Optionally, you can set an error message to display to the user
                        setErrorMessage('Failed to sign up. Please try again.');
                        setLoading(false)
                    });
            } catch (error) {
                console.error(error);
                alert("Invalid Credentials!");
                setLoading(false)
            } finally {
                // setLoading(false);
                setLoading(false)
                setIsSignInForm(!isSignInForm)
            }
        }
        else {
            //Sign In Logic
            try {
                // setLoading(true);
                const loginData = {
                    email: email.current.value,
                    password: password.current.value
                };
                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: `${process.env.REACT_APP_HOST_URL}/auth/login`,
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `${localStorage.getItem('auth')}`,
                    },
                    data: loginData
                };
                axios.request(config)
                    .then(response => {
                        // Handle successful login response
                        alert("Login Successful");
                        localStorage.setItem('auth-token', response.data);
                        navigate('/home')
                        setLoading(false)
                        // Optionally, you can perform any actions upon successful signup
                    })
                    .catch(error => {
                        // Handle signup error
                        if (error.response) {
                            console.error('Server responded with an error:', error.response.data);
                        } else if (error.request) {
                            console.error('No response received from the server:', error.request);
                        } else {
                            console.error('Error setting up the request:', error.message);
                        }
                        // Optionally, you can set an error message to display to the user
                        setErrorMessage('Failed to sign up. Please try again.');
                        setLoading(false)
                    });

            } catch (error) {
                console.error(error);
                alert("Invalid Credentials!");
                setLoading(false)
            }
        }

    }

    const toggleShowHidePass = () => {
        setToggle(!toggle)
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    if (isSignInForm) {
        document.title = `${capitalizeFirstLetter('Login')} - FoodRestro`;
    }
    if (!isSignInForm) {
        document.title = `${capitalizeFirstLetter('SignUp')} - FoodRestro`;
    }

    return (
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
            <div className="md:w-1/3 max-w-sm">
                <img className="rounded-full lg:w-96 md:w-48 sm: w-48"
                    src={BrandLogo}
                    alt="loginImg"
                />
            </div>
            <div className="md:w-1/3 max-w-sm">
                <div className="text-red-600 my-5 text-center font-bold text-3xl md:text-left">
                    {(isSignInForm) ? "Login" : "Sign Up"}
                </div>
                <form action="" onSubmit={(e) => e.preventDefault()} className=''>
                    {(!errorMessage) ? "" : <p className='font-semibold text-red-600 py-3'>{errorMessage}</p>}
                    {(isSignInForm) ? <></> : <input ref={name} className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" type="text" placeholder='Name' />}
                    <input ref={email}
                        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                        type="text"
                        placeholder="Email Address"
                    />
                    {(isSignInForm) ? <></> : <input ref={phoneNumber} className=" mt-4 text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" placeholder="Ph. Number" type="tel" id="phone" name="phone" pattern="[0-9]{4}-[0-9]{4}-[0-9]{2}" />}
                    {(isSignInForm) ? <></> : <input ref={address} className=" mt-4 text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" placeholder="Address" type="text" id="address" name="address" />}

                    <div className='flex justify-between items-center text-sm w-full border border-solid border-gray-300 rounded mt-4' >
                        <input ref={password}
                            className="text-sm w-full px-4 py-2 "
                            type={toggle ? ("text") : ("password")}
                            placeholder="Password"
                        />
                        {!toggle ? (<BiHide size={23} className='mx-2 text-gray-400 cursor-pointer' onClick={toggleShowHidePass} />) : (<BiShow size={23} className='mx-2 text-gray-400 cursor-pointer' onClick={toggleShowHidePass} />)}

                    </div>
                    <button className='uppercase my-3 px-10 py-3 text-sm rounded-md bg-green-600 text-white hover:bg-green-700 transition-all duration-300 ease-in-out transform hover:scale-105 flex gap-1 items-center' onClick={handleButtonClick}>
                        {(loading) ? ("Loading") : (<>{(isSignInForm) ? "Login" : "Sign Up"}</>)}
                    </button>
                </form>
                <div className="mt-4 flex justify-between font-semibold text-sm">
                    <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                        <input className="mr-1" type="checkbox" />
                        <span>Remember Me</span>
                    </label>
                    <Link
                        className="text-red-600 hover:text-red-500 hover:underline hover:underline-offset-4"
                        href="/login"
                    >
                        Forgot Password?
                    </Link>
                </div>
                <div>
                    {isSignInForm ?
                        <p className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left " >New to Achari-Lounge? <span onClick={toggleSignIn} className=" text-red-600 underline cursor-pointer">Sign Up Now!</span></p>
                        :
                        <p className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left " >Already Registered? <span onClick={toggleSignIn} className=" text-red-600 underline cursor-pointer">Login</span></p>}
                </div>
            </div>
        </section>
    );
};

export default Login;