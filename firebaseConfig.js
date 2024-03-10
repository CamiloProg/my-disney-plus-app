// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCEJ-988SvK363fsmd0CHGB6LutGcAP2zM",
  authDomain: "my-disney-plus-app.firebaseapp.com",
  projectId: "my-disney-plus-app",
  storageBucket: "my-disney-plus-app.appspot.com",
  messagingSenderId: "869511828079",
  appId: "1:869511828079:web:4803e3336fbd3d6a08339a",
  measurementId: "G-D9SPWRP3L2"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener el módulo de autenticación
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword };
export default app;

