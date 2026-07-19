// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDeYLg0LkLY63-ivGy6gMn7aWGcWw0QNMA",
  authDomain: "kaushambieyehospital-29687.firebaseapp.com",
  projectId: "kaushambieyehospital-29687",
  storageBucket: "kaushambieyehospital-29687.firebasestorage.app",
  messagingSenderId: "115630772381",
  appId: "1:115630772381:web:aff4e0e401fba777f00474"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore Database
const db = getFirestore(app);

export { db };

