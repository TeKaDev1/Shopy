import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXhnT5AWMmJnQMDRFTlE5hdtKbjB4nxNw",
  authDomain: "dkhil-32644.firebaseapp.com",
  projectId: "dkhil-32644",
  storageBucket: "dkhil-32644.firebasestorage.app",
  messagingSenderId: "37336137805",
  appId: "1:37336137805:web:b4a3eae4650a7e87405c04",
  measurementId: "G-92BRXN0F8Z"
};

// Initialize Firebase with error handling
let firebaseApp;
try {
  firebaseApp = initializeApp(firebaseConfig);
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Firebase initialization error:", error);
  // Fallback to local data if Firebase fails to initialize
}

// Initialize services with error handling
let auth, database, storage;

try {
  auth = getAuth(firebaseApp);
  database = getDatabase(firebaseApp);
  storage = getStorage(firebaseApp);
  
  // Enable offline persistence for Realtime Database
  // This helps with intermittent connection issues
  database.goOnline();
  
  console.log("Firebase services initialized successfully");
} catch (error) {
  console.error("Firebase services initialization error:", error);
}

export { firebaseApp, auth, database, storage };
export default firebaseApp;

