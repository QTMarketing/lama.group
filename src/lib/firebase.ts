// Firebase configuration and initialization
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { getAnalytics, type Analytics, isSupported } from 'firebase/analytics';
import { doc, getDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase app
let firebaseApp: FirebaseApp | null = null;

if (!getApps().length) {
  // Check if Firebase configuration is available
  if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
    console.warn('Firebase configuration is incomplete. Firebase features will be disabled.');
    // Don't throw error during build, just warn
    firebaseApp = null;
  } else {
    firebaseApp = initializeApp(firebaseConfig);
  }
} else {
  firebaseApp = getApps()[0];
}

// Initialize Firebase services (only if app is available)
export const auth: Auth | null = firebaseApp ? getAuth(firebaseApp) : null;
export const db: Firestore | null = firebaseApp ? getFirestore(firebaseApp) : null;
export const storage: FirebaseStorage | null = firebaseApp ? getStorage(firebaseApp) : null;

// Enable offline persistence for Firestore
if (typeof window !== 'undefined' && db) {
  // Enable offline persistence in browser environment (only if db is available)
  import('firebase/firestore').then(({ enableIndexedDbPersistence }) => {
    enableIndexedDbPersistence(db).catch((err) => {
      if (err.code === 'failed-precondition') {
        console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
      } else if (err.code === 'unimplemented') {
        console.warn('The current browser does not support persistence.');
      }
    });
  });
}

// Initialize Analytics (only in browser environment)
let analytics: Analytics | null = null;

// Check if analytics is supported and initialize
if (typeof window !== 'undefined' && firebaseApp) {
  isSupported().then((supported) => {
    if (supported && firebaseApp) {
      analytics = getAnalytics(firebaseApp);
    }
  });
}

export { analytics };

// Export the Firebase app instance
export { firebaseApp };

// Export Firebase app for additional configurations
export default firebaseApp;

// Test function to check Firebase connectivity
export async function testFirebaseConnection(): Promise<boolean> {
  try {
    const testDoc = doc(db, 'test', 'connection');
    await getDoc(testDoc);
    console.log('Firebase connection successful');
    return true;
  } catch (error: any) {
    console.error('Firebase connection failed:', error);
    
    if (error.code === 'permission-denied') {
      console.error('Firestore rules are blocking access. Check your security rules.');
    } else if (error.code === 'unavailable') {
      console.error('Firebase service is unavailable. Check your project status.');
    } else if (error.message?.includes('offline')) {
      console.error('Firebase client is offline. Check your internet connection.');
    }
    
    return false;
  }
} 