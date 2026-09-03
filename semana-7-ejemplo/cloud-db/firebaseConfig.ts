// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVaSAm8IGB38ye4hoYT67aV6n0ZMJwUbk",
  authDomain: "cloud-db-7ff80.firebaseapp.com",
  projectId: "cloud-db-7ff80",
  storageBucket: "cloud-db-7ff80.firebasestorage.app",
  messagingSenderId: "742280670110",
  appId: "1:742280670110:web:35dee4f76a51dbef04048f",
  measurementId: "G-2V8GRW0E37",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
