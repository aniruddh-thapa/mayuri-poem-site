// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mayuri-poems.firebaseapp.com",
  projectId: "mayuri-poems",
  storageBucket: "mayuri-poems.appspot.com",
  messagingSenderId: "860370014314",
  appId: "1:860370014314:web:b4b65f64dcc924e543ba13"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);