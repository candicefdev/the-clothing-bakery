import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB66isBSHPs_Sf2FoTo5AS4cT52qgPxHrc',
  authDomain: 'the-clothing-bakery-db.firebaseapp.com',
  projectId: 'the-clothing-bakery-db',
  storageBucket: 'the-clothing-bakery-db.appspot.com',
  messagingSenderId: '372310220360',
  appId: '1:372310220360:web:69ca7e1a0b7a226390827d',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

//for google authentication
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();

//anonymous function
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  //if we don't get a user auth, return..way to protect code
  //ways to say if we don't recieve any arugments don't run the function
  if (!userAuth) return;

  //see if there is an exisiting document reference
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  //check to see if usersnapshot exists. if it does'nt exist we want to create and set the document
  // So
  //if user data does not exist
  //create /set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  //if user data exists
  //just return it
  return userDocRef;

  //if user data exsists
};

// export const createAuthUserWithEmailAndPassword = async (email, password) => {
//     if(!email || !password) return;

//     //will give you back an auth object
//    return await createAuthUserWithEmailAndPassword(auth, email, password);
// };

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};
