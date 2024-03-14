// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6SduG2W8-EZiYkzYcEml_BbZemf00dIg",
  authDomain: "achari-lounge-web.firebaseapp.com",
  projectId: "achari-lounge-web",
  storageBucket: "achari-lounge-web.appspot.com",
  messagingSenderId: "759099465990",
  appId: "1:759099465990:web:08f0ef0fd7847409653e87",
  measurementId: "G-HJN09RHEC9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();