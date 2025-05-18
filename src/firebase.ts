// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARwUQGfrmkuX4ehegMJob-5-IJleVqvJY",
  authDomain: "prueba-campo-d8d9a.firebaseapp.com",
  projectId: "prueba-campo-d8d9a",
  storageBucket: "prueba-campo-d8d9a.firebasestorage.app",
  messagingSenderId: "788838124129",
  appId: "1:788838124129:web:57508a0a8195a84c013820"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);