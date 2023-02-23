// import firebase from 'firebase/compat/app';
// import { getFirestore, collection, addDoc } from 'firebase/firestore';
// import * as a from 'react-bootstrap';
import 'firebase/compat/auth';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

const firebaseConfig = {
// Ommited for security reasons. Will update later. 
};

// Initialize Firebase
var firebase = require('firebase/app');
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const db = getFirestore(app); // Initialize Cloud Firestore through Firebase

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
// export const auth = firebase.auth();
export default firebase;

// User Registration
const userRegistration = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await db.collection('users').add({
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (err) {
    alert(err.message);
  }
};

// Sign-in with Email/Password
export const polygraphSignInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    alert(err.message);
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    alert(err.message);
  }
};

export const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (err) {
    alert(err.message);
  }
};
