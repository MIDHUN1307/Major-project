import {
  getFirestore,
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { app } from "./firebaseConfig";

const db = getFirestore(app);

export const saveUserProfile = async (uid, userData) => {
  await setDoc(doc(db, "users", uid), userData);
};

// Check if username already exists
export const isUsernameTaken = async (username) => {
  const q = query(
    collection(db, "users"),
    where("username", "==", username)
  );

  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

// REQUIRED for login (by uid)
export const getUserProfile = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("User profile not found");
  }
};

// ✅ NEW: get email using username (REQUIRED)
export const getEmailByUsername = async (username) => {
  const q = query(
    collection(db, "users"),
    where("username", "==", username)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    throw new Error("Username not found");
  }

  return snapshot.docs[0].data().email;
};
