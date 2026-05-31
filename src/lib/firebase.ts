import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBJTNj-Z7Ep_UxZK-yQyVe4ZBaH5NPDpGY",
  authDomain: "anime-website-66440.firebaseapp.com",
  projectId: "anime-website-66440",
  storageBucket: "anime-website-66440.firebasestorage.app",
  messagingSenderId: "204489633961",
  appId: "1:204489633961:web:62337304623e17dafab9b8",
  measurementId: "G-7Z05YERJGL"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
