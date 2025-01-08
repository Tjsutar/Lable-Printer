// src/firebase/firebaseConfig.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { FirebaseOptions } from "firebase/app";

// Your Firebase config object
const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyBLqq29N-drKrJ7zNwE6hgJCkcf60SJot0',
  authDomain: 'excel-import-app.firebaseapp.com',
  projectId: 'excel-import-app',
  storageBucket: 'excel-import-app.firebasestorage.app',
  messagingSenderId: '92999942249',
  appId: '1:92999942249:web:78fbc87c41c632994f62f8',
  measurementId: 'G-Q9R72BH0K0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { auth, app };
