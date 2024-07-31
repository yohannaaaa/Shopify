import { FirebaseOptions, getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyC6SOHj3oG1G12RDo1hrCRoLdaEzJrI0Ag",
  authDomain: "shopify-f3d35.firebaseapp.com",
  projectId: "shopify-f3d35",
  storageBucket: "shopify-f3d35.appspot.com",
  messagingSenderId: "389395091855",
  appId: "1:389395091855:web:9f2048d4b6761345e5fbfa",
};
export const getFirebaseApp = (options: FirebaseOptions) => {
  return !getApps().length ? initializeApp(options) : getApp();
};

export const useFirebaseAuth = () => {
  const getFirebaseAuth = getAuth(getFirebaseApp(firebaseConfig));
  return { auth: getFirebaseAuth };
};

export const firestore = getFirestore(getFirebaseApp(firebaseConfig));
export const storage = getStorage(getFirebaseApp(firebaseConfig));
