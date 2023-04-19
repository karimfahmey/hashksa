import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from 'firebase/auth';
import { FacebookAuthProvider } from "firebase/auth";
import { TwitterAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCt8CViDIMeQQB_SYckPD79MaX2QpoN-Rg",
  authDomain: "hashksa-378512.firebaseapp.com",
  projectId: "hashksa-378512",
  storageBucket: "hashksa-378512.appspot.com",
  messagingSenderId: "841717470500",
  appId: "1:841717470500:web:2d52a8d924d1c6c76dcfb1",
  measurementId: "G-251FQQFSPX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();

export {auth, provider, googleProvider, twitterProvider}