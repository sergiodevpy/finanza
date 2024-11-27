// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyC0ysKq_EwzBgyOtP62vsJCysxDomkeTZ0",
  authDomain: "finanzaiglesia---firestore.firebaseapp.com",
  projectId: "finanzaiglesia---firestore",
  storageBucket: "finanzaiglesia---firestore.firebasestorage.app",
  messagingSenderId: "800707072309",
  appId: "1:800707072309:web:94582024bc0509c6657c7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const storage = getStorage(app, "gs://finanzaiglesia---firestore.firebasestorage.app");


export {
  db,
  auth,
  storage
}
