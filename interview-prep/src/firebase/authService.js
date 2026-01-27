import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "./firebaseConfig";

const auth = getAuth(app);

// Signup
export const signupWithEmail = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Login
export const loginWithEmail = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};
