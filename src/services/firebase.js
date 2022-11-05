import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, query, where } from "firebase/firestore";

const app = initializeApp({
  apiKey: "AIzaSyA0_zzbffWA0vEgeZg4ro06DBN1Hdnclv8",
  authDomain: "rssfeed-74f8e.firebaseapp.com",
  projectId: "rssfeed-74f8e",
  storageBucket: "rssfeed-74f8e.appspot.com",
  messagingSenderId: "170499080578",
  appId: "1:170499080578:web:89ca184841c06cb0d7cf9b",
  measurementId: "G-WB94C59CCB"
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
  const { name, url, enabled, uid } = data;
  try {
    const ref = await addDoc(collection(db, "feeds"), {
      name,
      url,
      enabled,
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

export const updateFeedStatus = async (data) => {
  const { feedId, status } = data;
  try {
    await updateDoc(collection(db, `feeds/${feedId}`), {
      status,
    });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

export const deleteFeed = async (data) => {
  const { feedId } = data;
  try {
    await deleteDoc(collection(db, `feeds/${feedId}`));
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
}