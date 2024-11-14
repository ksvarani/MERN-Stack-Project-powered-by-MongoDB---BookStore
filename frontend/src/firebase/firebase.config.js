// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAxG3DpbZBTB0PQFXITiyN_s3eBnM5WpWs",
  authDomain: "book-store-8259e.firebaseapp.com",
  projectId: "book-store-8259e",
  storageBucket: "book-store-8259e.appspot.com",
  messagingSenderId: "298745555504",
  appId: "1:298745555504:web:48b6877196f522e178dbf5",
  measurementId: "G-B4LPZGT7GE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app