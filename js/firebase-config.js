// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKOyBc7G3IhJOaZllkHa9m-sWUfpvfzbk",
  authDomain: "rf-creations-agency.firebaseapp.com",
  projectId: "rf-creations-agency",
  storageBucket: "rf-creations-agency.firebasestorage.app",
  messagingSenderId: "121024559388",
  appId: "1:121024559388:web:ad90cbdc79abba555aa2d9",
  measurementId: "G-BG5SK5B132"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
