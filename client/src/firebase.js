// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "full-stack-auth-9fb05.firebaseapp.com",
  projectId: "full-stack-auth-9fb05",
  storageBucket: "full-stack-auth-9fb05.appspot.com",
  messagingSenderId: "227055802239",
  appId: "1:227055802239:web:efc0d2e88ae9f96a472c4a",
  measurementId: "G-H19KQL8LG5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);