// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAuth } from "firebase/auth"; // Import Authentication
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAM1Kw9fXfFPrwEXQb1HD-S9b1jzoTGSU8",
  authDomain: "competo-c0d05.firebaseapp.com",
  projectId: "competo-c0d05",
  storageBucket: "competo-c0d05.appspot.com",
  messagingSenderId: "415935831507",
  appId: "1:415935831507:web:768acc0b5da6502f862326",
  measurementId: "G-LN0FZZYCBJ"
};

 const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const firestore = getFirestore(app); // Initialize Firestore
const auth = getAuth(app); // Initialize Authentication
const storage = getStorage(app); // Add this line to include storage

export { app, firestore, auth, storage };