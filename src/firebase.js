import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBjpo15Nn6pCGpztP8Mr-A6ZQNqox42Fhw",
    authDomain: "edutech-e09a2.firebaseapp.com",
    projectId: "edutech-e09a2",
    storageBucket: "edutech-e09a2.appspot.com", 
    messagingSenderId: "880334951581",
    appId: "1:880334951581:web:fa48708657b2bcaba9b074",
    measurementId: "G-RCDJJ203BW"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth };
export { db };