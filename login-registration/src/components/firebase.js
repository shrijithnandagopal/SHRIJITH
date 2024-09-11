// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Import Auth

const firebaseConfig = {
    apiKey: "AIzaSyALDx1aWNaWciBncFXmgUxoYex8w60N3mI",
    authDomain: "login-and-registration-d30d7.firebaseapp.com",
    projectId: "login-and-registration-d30d7",
    storageBucket: "login-and-registration-d30d7.appspot.com",
    messagingSenderId: "669929639358",
    appId: "1:669929639358:web:2ca055c249f636d92cbdef"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app); // Initialize Auth

export { db, auth }; // Export both db and auth
