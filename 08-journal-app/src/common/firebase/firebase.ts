// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCLIed9g-NwYVIAyUypqJHyXOQ-D_jltCU',
  authDomain: 'al-journal-store.firebaseapp.com',
  projectId: 'al-journal-store',
  storageBucket: 'al-journal-store.appspot.com',
  messagingSenderId: '665433362647',
  appId: '1:665433362647:web:9b4886a5bcdafc01f52092',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
