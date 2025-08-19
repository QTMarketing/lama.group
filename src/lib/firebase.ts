// Firebase configuration and initialization
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { getAnalytics, type Analytics, isSupported } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOTEkXKnILnkaxff7Hi3-4SdsHIJGhhZE",
  authDomain: "lama-group-a97c2.firebaseapp.com",
  projectId: "lama-group-a97c2",
  storageBucket: "lama-group-a97c2.firebasestorage.app",
  messagingSenderId: "26634342952",
  appId: "1:26634342952:web:09f76a96db5c5207ee9b1d",
  measurementId: "G-822H2DNEDH"
};

// Initialize Firebase app
let firebaseApp: FirebaseApp;

if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApps()[0];
}

// Initialize Firebase services
export const auth: Auth = getAuth(firebaseApp);
export const db: Firestore = getFirestore(firebaseApp);
export const storage: FirebaseStorage = getStorage(firebaseApp);

// Initialize Analytics (only in browser environment)
let analytics: Analytics | null = null;

// Check if analytics is supported and initialize
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(firebaseApp);
    }
  });
}

export { analytics };

// Export the Firebase app instance
export { firebaseApp };

// Export Firebase app for additional configurations
export default firebaseApp; 