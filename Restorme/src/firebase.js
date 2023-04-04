// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  browserSessionPersistence,
  setPersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDjUHTpZGEztu4CCvWLc6USL7PSdc-kYU",
  authDomain: "restorme-cf3da.firebaseapp.com",
  projectId: "restorme-cf3da",
  storageBucket: "restorme-cf3da.appspot.com",
  messagingSenderId: "779286084410",
  appId: "1:779286084410:web:067bbae52c302fc743ae03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.setPersistence(browserSessionPersistence);

const db = getFirestore(app);

import { getStorage, getStream } from "firebase/storage";
const storage = getStorage(app);

export { auth, db, storage };
