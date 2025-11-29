// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAxcbt3MJ2lFQetxWucM07FmTy6COx5PA",
  authDomain: "code-convertor-10a9e.firebaseapp.com",
  projectId: "code-convertor-10a9e",
  storageBucket: "code-convertor-10a9e.firebasestorage.app",
  messagingSenderId: "441034627444",
  appId: "1:441034627444:web:b342438e49e2ec86697421",
  measurementId: "G-MBTLV3HNS5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);