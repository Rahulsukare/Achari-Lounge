// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8XPDmtFAKUeelMjmt8TB7ocVdbVUXEp4",
  authDomain: "achari-lounge.firebaseapp.com",
  projectId: "achari-lounge",
  storageBucket: "achari-lounge.appspot.com",
  messagingSenderId: "959920290440",
  appId: "1:959920290440:web:b57c38f47bb2a9704f3d3d",
  measurementId: "G-DKW3DXY5NB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();