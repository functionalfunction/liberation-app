import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCIB97_1YB43Ls_0pxpjzRV62hrxjhC_gE",
  authDomain: "liberation-app.firebaseapp.com",
  projectId: "liberation-app",
  storageBucket: "liberation-app.appspot.com",
  messagingSenderId: "1063207238957",
  appId: "1:1063207238957:web:efbfed2c7707399c6467a4",
  measurementId: "G-D52VWC5Z8Z",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
