import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBvjwbmI8YP3DuCGv9EMTxEAKJnxXP2wlo",
  authDomain: "evaluacion-34a77.firebaseapp.com",
  projectId: "evaluacion-34a77",
  storageBucket: "evaluacion-34a77.appspot.com",
  messagingSenderId: "349327631690",
  appId: "1:349327631690:web:3346233cce56bdf3640db3"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
