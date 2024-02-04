// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';
import { getAuth,GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCwHSBBO6vCIdMvIT_ULyNlZtrTCGrol4w",
  authDomain: "isa-official-web.firebaseapp.com",
  databaseURL: "https://isa-official-web-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "isa-official-web",
  storageBucket: "isa-official-web.appspot.com",
  messagingSenderId: "184356431419",
  appId: "1:184356431419:web:818f287da4742549851e1e",
  measurementId: "G-2HZPTD8F0E"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db=getDatabase(app);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
export const provider= new GoogleAuthProvider();