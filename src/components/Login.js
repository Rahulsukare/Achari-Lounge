import React, {useRef, useState} from "react";
import {checkValidData} from "../utils/Validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../utils/firebase";
const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(false);
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const toggleSignIn = () => {
        setIsSignInForm(!isSignInForm);
        setErrorMessage(null);
    }
    const handleButtonClick = () => {
        //validate the form data
        const msg = checkValidData(email.current.value, password.current.value);
        setErrorMessage(msg);
        console.log(email.current.value);
        console.log(password.current.value);
        console.log(msg);

        if(msg)
            return;
        //sign In/ Sign Up
        if(isSignInForm === false){
            // Sign Up Logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorMessage);
            });
        }
        else{
            //Sign In Logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorMessage);
                
            });
        }
    }
    return (
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
        <div className="md:w-1/3 max-w-sm">
            <img className="rounded-full lg:w-96 md:w-48 sm: w-48"
            src="https://thumbs.dreamstime.com/z/plate-fork-spoon-restaurant-logo-white-background-eps-plate-fork-spoon-restaurant-logo-193685698.jpg?w=768"
            alt="loginImg"
            />
        </div>
        <div className="md:w-1/3 max-w-sm">
            <div className="text-[#F4511F] my-5 text-center font-bold text-3xl md:text-left">
                Login
            </div>
            <form action=""  onSubmit={(e) => e.preventDefault()} className=''>
                {(isSignInForm) ? <></> : <input ref = {name} className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" type="text" placeholder='Name'/>}
                {(!errorMessage) ? "" : <p className='font-semibold text-red-600'>{errorMessage}</p>}
                <input ref = {email}
                className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                type="text"
                placeholder="Email Address"
                />
                <input ref = {password}
                className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                type="password"
                placeholder="Password"
                />
                <button className='my-3 px-6 py-1 border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition-all rounded-full' onClick={handleButtonClick}>
                    {(isSignInForm) ? "Sign In" : "Sign Up"}
                </button>
            </form>
            <div className="mt-4 flex justify-between font-semibold text-sm">
            <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                <input className="mr-1" type="checkbox" />
                <span>Remember Me</span>
            </label>
            <a
                className="text-[#F4511F] hover:text-[#ba2f05] hover:underline hover:underline-offset-4"
                href="#"
            >
                Forgot Password?
            </a>
            </div>
            <div>
                <p className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left hover: cursor-pointer" onClick={toggleSignIn}>{(isSignInForm) ? "New to Netflix? Sign Up Now!" : "Already Registered? Sign In Now!"}</p>
            </div>
        </div>
        </section>
    );
};

export default Login;