import {firebase} from 'firebase/compat/app';
import { getFirestore, 
  collection, 
  addDoc
} from 'firebase/firestore'
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyDirvxTGs-Tk5lVPUzqJINb56kA6nd1n-c',
    authDomain: 'polygraph-792ef.firebaseapp.com',
    projectId: 'polygraph-792ef',
    storageBucket: 'polygraph-792ef.appspot.com',
    messagingSenderId: '909822764908',
    appId: '1:909822764908:web:e5010f4c32289c9c0f7549',
    measurementId: 'G-NCN4WHS511'
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(); // Initialize Cloud Firestore through Firebase

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const auth = firebase.auth();
export default firebase;

// User Registration
const userRegistration = async (name, email, password) => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password);
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
export const signInWithEmailAndPassword = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      alert(err.message);
    }
  };


  export const resetPassword = async (email) => {
    try {
      await auth.sendPasswordResetEmail(email);
    } catch (err) {
      alert(err.message);
    }
  };

  export const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password);
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