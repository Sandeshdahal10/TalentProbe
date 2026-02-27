
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ai-interview-5d51f.firebaseapp.com",
  projectId: "ai-interview-5d51f",
  storageBucket: "ai-interview-5d51f.firebasestorage.app",
  messagingSenderId: "558857879436",
  appId: "1:558857879436:web:5bf3d98184cba791d720a9"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };