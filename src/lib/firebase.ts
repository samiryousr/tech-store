import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVAdnQgWC6L8JNYpgA518OK-fK-Tfz1mI",
  authDomain: "tech-store-bb899.firebaseapp.com",
  projectId: "tech-store-bb899",
  storageBucket: "tech-store-bb899.firebasestorage.app",
  messagingSenderId: "47385019849",
  appId: "1:47385019849:web:f98920aed1ae1fb1901418",
  measurementId: "G-YG845ERSH4"
};
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);

export const analytics =
  typeof window !== "undefined"
    ? isSupported().then((yes) => (yes ? getAnalytics(app) : null))
    : null;

export default app;  