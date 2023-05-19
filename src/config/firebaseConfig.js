// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBkWiG2htgsvNCxkktNCxAS3jftwlZgTIM",
    authDomain: "docs-clone-45214.firebaseapp.com",
    projectId: "docs-clone-45214",
    storageBucket: "docs-clone-45214.appspot.com",
    messagingSenderId: "586762180595",
    appId: "1:586762180595:web:2a8eb8a56737c716202486"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
