import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyALDx1aWNaWciBncFXmgUxoYex8w60N3mI",
    authDomain: "login-and-registration-d30d7.firebaseapp.com",
    projectId: "login-and-registration-d30d7",
    storageBucket: "login-and-registration-d30d7.appspot.com",
    messagingSenderId: "669929639358",
    appId: "1:669929639358:web:2ca055c249f636d92cbdef"
  };
  

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
