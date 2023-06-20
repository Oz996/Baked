import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


export const firebaseConfig = {
  apiKey: "AIzaSyA0Dy-bHVy5TXvVxvPfIx_gAlKtSwEhGaM",
  authDomain: "baked-94cb5.firebaseapp.com",
  databaseURL:
    "https://baked-94cb5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "baked-94cb5",
  storageBucket: "baked-94cb5.appspot.com",
  messagingSenderId: "651344050316",
  appId: "1:651344050316:web:a6720b1f0557c8cd1e63a9",
  measurementId: "G-6CNXE6BPQ6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
