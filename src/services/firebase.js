import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, query, where, doc, getDoc } from "firebase/firestore";

const app = initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId:  process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
});

// Auth
export const auth = getAuth();

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, googleProvider);
}

export const logOut = async () => {
  return signOut(auth);
}

// Store
const db = getFirestore(app);

export const addFeed = async (data) => {
  const { name, url, bookmarked, uid } = data;
  try {
    const ref = await addDoc(collection(db, "feeds"), {
      name,
      url,
      bookmarked,
      uid
    });
    return ref;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const getFeeds = async (uid) => {
  const q = query(collection(db, "feeds"), where("uid", "==", uid));
  return await getDocs(q);
}

export const getFeed = async (feedId) => {
  return await getDoc(doc(db, `feeds/${feedId}`));
}

export const updateFeed = async (feedId, updateData) => {
  try {
    await updateDoc(doc(db, `feeds/${feedId}`), updateData);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

export const deleteFeed = async (feedId) => {
  try {
    await deleteDoc(doc(db, `feeds/${feedId}`));
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
}