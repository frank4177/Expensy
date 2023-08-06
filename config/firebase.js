import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth';
import {getFirestore, collection} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvE7u6WAdFoS5s76SWR_DA5F6LW25T_-I",
  authDomain: "expensify-848f5.firebaseapp.com",
  projectId: "expensify-848f5",
  storageBucket: "expensify-848f5.appspot.com",
  messagingSenderId: "730512958727",
  appId: "1:730512958727:web:776d7f3074c67248dfd1a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


export const tripsRef = collection(db, 'trips')
export const expensesRef = collection(db, 'expenses')

export default app;