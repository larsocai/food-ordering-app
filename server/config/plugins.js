module.exports = {
  "strapi-google-auth": {
    enabled: true,
    config: {
      clientID:
        "115538415412-6slu4qjbplerhdht1q24ddu4in0vdt1q.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://127.0.0.1:1337",
      scope: ["email", "profile"],
    },
  },
};

// const _ = require("lodash");
// const { initializeApp } = require("firebase/app");
// const {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   GoogleAuthProvider,
// } = require("firebase/auth");

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAHDTT2yNF61Uy7PiIYnCPYIsqtl8Zp9J4",

//   authDomain: "food-app-ce999.firebaseapp.com",

//   projectId: "food-app-ce999",

//   storageBucket: "food-app-ce999.appspot.com",

//   messagingSenderId: "106265501250",

//   appId: "1:106265501250:web:4741956528192ca69dd7db",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Firebase authentication setup
// const auth = getAuth(app);

// // Function for user registration using email and password
// const registerUser = async (email, password) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     return userCredential;
//   } catch (error) {
//     console.error("Error registering user:", error);
//     throw error;
//   }
// };

// // Function for user sign-in using email and password
// const signInUser = async (email, password) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     return userCredential;
//   } catch (error) {
//     console.error("Error signing in:", error);
//     throw error;
//   }
// };

// const provider = new GoogleAuthProvider();

// // Function for Google sign-in
// const signInWithGoogle = () => {
//   console.log("here");
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       // This gives you a Google Access Token. You can use it to access the Google API.
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken;
//       // The signed-in user info.
//       const user = result.user;
//       // IdP data available using getAdditionalUserInfo(result)
//       // ...
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       const email = error.customData.email;
//       // The AuthCredential type that was used.
//       const credential = GoogleAuthProvider.credentialFromError(error);
//       // ...
//     });
// };

// const signInWithGoogle = async () => {
//   try {
//     const provider = new GoogleAuthProvider();
//     provider.setCustomParameters({
//       prompt: 'select_account'
//     })
//     const result = await signInWithPopup(auth, provider);
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     const user = result.user;
//     console.log("User signed in with Google:", user);
//     return result; // Return the result if needed
//   } catch (error) {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     const email = error.customData.email;
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     console.error("Error signing in with Google:", errorMessage);
//     throw error; // Throw the error to handle it in the calling function
//   }
// };

// module.exports = {
//   "register-user": registerUser,
//   "sign-in-user": signInUser,
//   "sign-in-with-google": signInWithGoogle,
// };
