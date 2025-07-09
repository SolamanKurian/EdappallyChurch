import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCyQF3zw-JCSpcEX7Sp3qQueaNu3svoxM8",
  authDomain: "edchurch-6ea6c.firebaseapp.com",
  projectId: "edchurch-6ea6c",
  storageBucket: "edchurch-6ea6c.appspot.com",
  messagingSenderId: "363746448963",
  appId: "1:363746448963:web:2bc342fe13ee3146e426f6",
  measurementId: "G-REMHLHLQ2L"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app; 