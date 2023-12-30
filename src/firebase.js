import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


import "@firebase/firestore";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDTZLl0m38_soSDtYHH2XgalRwBzfR7LH4",
  authDomain: "wiksplit.firebaseapp.com",
  projectId: "wiksplit",
  storageBucket: "wiksplit.appspot.com",
  messagingSenderId: "679901671527",
  appId: "1:679901671527:web:b23cab766e6356cc43a4c2",
  measurementId: "G-65MG7ZHRLN"
};

const app = initializeApp(firebaseConfig);
export default app;

export const auth = getAuth(app);

export const db = getFirestore();