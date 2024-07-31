import { FirebaseOptions, getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey:process.env.FIREBASE_API_KEY,
  authDomain:process.env.FIREBASE_AUTH_DOMAIN,
  projectId:process.env.FIREBASE_PROJECT_ID,
  storageBucket:process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId:process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId:process.env.FIREBASE_APP_ID
};


export const getFirebaseApp = (options: FirebaseOptions) => {
    return !getApps().length ? initializeApp(options) : getApp();
  };
  
export const useFirebaseAuth = () => {
    const getFirebaseAuth = getAuth(getFirebaseApp(firebaseConfig));
    return { getFirebaseAuth };
  };
  
export const auth = getAuth(getFirebaseApp(firebaseConfig));