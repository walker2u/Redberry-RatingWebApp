// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDE8ZUeQ0_vk_Fhf3lNdtROpb4ASDaPI3M",
    authDomain: "redberry-rating-app.firebaseapp.com",
    projectId: "redberry-rating-app",
    storageBucket: "redberry-rating-app.appspot.com",
    messagingSenderId: "932612299786",
    appId: "1:932612299786:web:8956eab8bec7867ff193f3",
    measurementId: "G-9BMVFB9SLZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app