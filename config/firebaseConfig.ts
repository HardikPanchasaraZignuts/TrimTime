// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Ensure Auth uses AsyncStorage for persistence
const auth =
  getApps().length === 0
    ? initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      })
    : getAuth(app);

const db = getFirestore(app);

export { app, auth, db };


// const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// // initializeAuth only if it hasn't already been initialized
// let auth;

// if (getApps().length === 1 && !getAuth().currentUser) {
//   try {
//     auth = initializeAuth(app, {
//       persistence: getReactNativePersistence(AsyncStorage),
//     });
//   } catch (e) {
//     // already initialized (safe fallback)
//     auth = getAuth(app);
//   }
// } else {
//   auth = getAuth(app);
// }

// const db = getFirestore(app);

// export { app, auth, db };