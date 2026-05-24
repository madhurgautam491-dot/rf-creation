import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBKOyBc7G3IhJOaZllkHa9m-sWUfpvfzbk",
    authDomain: "rf-creations-agency.firebaseapp.com",
    projectId: "rf-creations-agency",
    storageBucket: "rf-creations-agency.firebasestorage.app",
    messagingSenderId: "121024559388",
    appId: "1:121024559388:web:ad90cbdc79abba555aa2d9",
    measurementId: "G-BG5SK5B132"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
