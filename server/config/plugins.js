const _ = require("lodash");
const { initializeApp } = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} = require("firebase/auth");

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHDTT2yNF61Uy7PiIYnCPYIsqtl8Zp9J4",
  authDomain: "food-app-ce999.firebaseapp.com",
  projectId: "food-app-ce999",
  storageBucket: "food-app-ce999.appspot.com",
  messagingSenderId: "106265501250",
  appId: "1:106265501250:web:4741956528192ca69dd7db",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase authentication setup
const auth = getAuth(app);

// Function for user registration using email and password
const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Function for user sign-in using email and password
const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

// Function for Google sign-in
const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log("User signed in with Google:", user);
    return result; // Return the result if needed
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.error("Error signing in with Google:", errorMessage);
    throw error; // Throw the error to handle it in the calling function
  }
};

module.exports = {
  "register-user": registerUser,
  "sign-in-user": signInUser,
  "sign-in-with-google": signInWithGoogle,
};
