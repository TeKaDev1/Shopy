import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwvH0kCjpr5H2Wlqwpva0PC0vjxeIM46o",
  authDomain: "tekadev1.firebaseapp.com",
  databaseURL: "https://tekadev1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tekadev1",
  storageBucket: "tekadev1.appspot.com",
  messagingSenderId: "1003700748004",
  appId: "1:1003700748004:web:ff23010162612fbef7f6f1"
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

