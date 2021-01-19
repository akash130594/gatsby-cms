import React from 'react'
import firebase from 'firebase';
import 'firebase/firestore';

// export const firebaseAuth  = firebase.auth();


// export const isLoggedIn = () => {
//     const user = firebaseAuth.currentUser
//     return user;
// }

// export const logout = () => {
//     firebaseAuth.signOut();
//     return true;
// }

const config = {
  apiKey: process.env.GATSBY_FIREBASE_APIKEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.GATSBY_FIREBASE_DATABASEURL,
  projectId: process.env.GATSBY_FIREBASE_PROJECTID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.GATSBY_FIREBASE_APPID
};

export const getFirebase = () => {
  if(!firebase.apps.length){
    const firebaseApp = firebase.initializeApp(config);
    let firestore = firebase.firestore();
    return firestore;
  }
}