// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "fullstack-auth-a08d2.firebaseapp.com",
  projectId: "fullstack-auth-a08d2",
  storageBucket: "fullstack-auth-a08d2.appspot.com",
  messagingSenderId: "778517461807",
  appId: "1:778517461807:web:e5615c42240a2ef491bfda"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);