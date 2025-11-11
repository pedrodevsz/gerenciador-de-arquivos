import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC6xbo14uQ55XkbhZDJIFJtAaAFZzKTIeA",
    authDomain: "files-manager-8afd3.firebaseapp.com",
    projectId: "files-manager-8afd3",
    storageBucket: "files-manager-8afd3.appspot.com",
    messagingSenderId: "1087649359431",
    appId: "1:1087649359431:web:a9de086a1caae9995fb362",
    measurementId: "G-DQ1F3BWL5Z",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
