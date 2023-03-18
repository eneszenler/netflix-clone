// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWVUyHyRpu8vTPUxvw1x_n37VgPYLENek",
  authDomain: "netflix-clone-8e66f.firebaseapp.com",
  projectId: "netflix-clone-8e66f",
  storageBucket: "netflix-clone-8e66f.appspot.com",
  messagingSenderId: "73935139091",
  appId: "1:73935139091:web:793c6d1b75a60bd42d6ae6"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }