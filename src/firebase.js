/**
 * ============================================================================
 * FIREBASE CONFIGURATION
 * ============================================================================
 * Firebase initialization and configuration for the YouTube Search Bar app
 */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcDJH2fwSykF3It_19Dmjz-yaORMNWVcE",
  authDomain: "yt-search-bar.firebaseapp.com",
  projectId: "yt-search-bar",
  storageBucket: "yt-search-bar.firebasestorage.app",
  messagingSenderId: "628860776671",
  appId: "1:628860776671:web:d1a912c25a12167089396a",
  measurementId: "G-DXPMLFT85S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser environment, not during SSR)
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, analytics };

