import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCBFli9L8AauV-lh-77mOKZ6FbyZdAjI-0',
  authDomain: 'spello-live-chat.firebaseapp.com',
  projectId: 'spello-live-chat',
  storageBucket: 'spello-live-chat.appspot.com',
  messagingSenderId: '414430093678',
  appId: '1:414430093678:web:406efd65b7bea6cf1b617f',
  measurementId: 'G-BL5KT04Y2Z',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const analytics = getAnalytics(app);
const storage = getStorage();
const db = getFirestore();

export { app, analytics, auth, storage, db };
