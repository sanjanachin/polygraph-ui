import 'firebase/compat/auth';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: str(os.environ.get('FIREBASE_API_KEY')),
  authDomain: 'polygraph-792ef.firebaseapp.com',
  projectId: 'polygraph-792ef',
  storageBucket: 'polygraph-792ef.appspot.com',
  messagingSenderId: '909822764908',
  appId: '1:909822764908:web:bf958968989380770f7549',
  measurementId: 'G-CVN8CXJHED',
};

// Initialize Firebase
const firebase = require('firebase/app');

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const db = getFirestore(app); // Initialize Cloud Firestore through Firebase

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export default firebase;

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
    const { user } = res;
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
