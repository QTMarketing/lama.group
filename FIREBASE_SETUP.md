# Firebase Setup Guide for Lama-next

## 🔥 Installation Complete
Firebase has been successfully installed and configured in your Next.js project.

## 📁 Files Created
- `src/lib/firebase.ts` - Firebase configuration and initialization
- `src/context/AuthContext.tsx` - Firebase Authentication context with React Context API

## 🌍 Environment Variables Required
Create a `.env.local` file in your project root with the following variables:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 🔧 How to Get Firebase Config
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Click on the gear icon ⚙️ next to "Project Overview"
4. Select "Project settings"
5. Scroll down to "Your apps" section
6. Click on the web app icon (</>) or create a new web app
7. Copy the config values from the provided code snippet

## 📚 Usage Examples

### Import Firebase Services
```typescript
import { auth, db, storage } from '@/lib/firebase';
```

### Using Authentication Context
```typescript
import { useAuth } from '@/context/AuthContext';

function MyComponent() {
  const { user, loading, signIn, signUp, signOutUser, signInWithGoogle } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  if (user) {
    return (
      <div>
        <p>Welcome, {user.displayName || user.email}!</p>
        <button onClick={signOutUser}>Sign Out</button>
      </div>
    );
  }
  
  return (
    <div>
      <button onClick={() => signInWithGoogle()}>Sign in with Google</button>
    </div>
  );
}
```

### Direct Google Login (Alternative Method)
```typescript
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};
```

### Testing Authentication
Visit `/test-auth` to test the authentication system with both methods.

### Sign-up Page
Visit `/signup` to test the complete sign-up flow with:
- Form validation for any valid email domain
- Password requirements (8-16 chars, uppercase, lowercase, number, special char)
- Firebase user creation
- Email verification
- Success/error handling

### Test Page (Authentication Testing)
Visit `/test-auth` to access the authentication testing interface:
- Context-based authentication methods
- Google OAuth testing
- User management testing
- Comprehensive authentication testing

### Main Entry Point
The Sign Up button in the top navigation now links directly to `/signup` for immediate access to the full signup form.

### Login Page
Visit `/login` to test the sign-in functionality.

### Authentication
```typescript
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

// Sign in
const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Sign in error:', error);
  }
};
```

### Firestore Database
```typescript
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Add document
const addDocument = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    console.error('Error adding document:', error);
  }
};
```

### Storage
```typescript
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';

// Upload file
const uploadFile = async (file: File, path: string) => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Upload error:', error);
  }
};
```

## ✅ Features Configured
- ✅ Firebase App initialization
- ✅ Authentication service
- ✅ Firestore database
- ✅ Storage service
- ✅ TypeScript support
- ✅ Modular SDK imports
- ✅ Environment variable configuration
- ✅ Singleton pattern (prevents multiple initializations)

## 🚀 Next Steps
1. Create your Firebase project
2. Add the environment variables to `.env.local`
3. Enable Authentication, Firestore, and Storage in Firebase Console
4. Start using Firebase services in your components! 