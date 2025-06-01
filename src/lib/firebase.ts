import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAwvH0kCjpr5H2Wlqwpva0PC0vjxeIM46o",
  authDomain: "tekadev1.firebaseapp.com",
  databaseURL: "https://tekadev1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tekadev1",
  storageBucket: "tekadev1.appspot.com",
  messagingSenderId: "1003700748004",
  appId: "1:1003700748004:web:ff23010162612fbef7f6f1"
};

try {
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const database = getDatabase(firebaseApp);
  const storage = getStorage(firebaseApp);

  export { firebaseApp, auth, database, storage };
} catch (error) {
  console.error('Error initializing Firebase:', error);
}