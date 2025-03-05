// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE,
    authDomain: "rate-things-88da5.firebaseapp.com",
    projectId: "rate-things-88da5",
    storageBucket: "rate-things-88da5.firebasestorage.app",
    messagingSenderId: "619196079161",
    appId: "1:619196079161:web:3cc4be57ddf7d248c441e8",
    measurementId: "G-GNV9CR82YT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }