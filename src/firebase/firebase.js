import { initializeApp } from "firebase/app";
import {
  getFirestore,
  setDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7hHLN7B8V_3RqlMpnrrpYzuWTfH0VBP8",
  authDomain: "ornate-crossbar-281715.firebaseapp.com",
  databaseURL: "https://ornate-crossbar-281715.firebaseio.com",
  projectId: "ornate-crossbar-281715",
  storageBucket: "ornate-crossbar-281715.appspot.com",
  messagingSenderId: "899156833947",
  appId: "1:899156833947:web:f0d7c8e5fce4905326f83e",
  measurementId: "G-MP1T71ETJM",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(db, "users", `${userAuth.uid}`);

  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    const { nickName, email } = userAuth;
    const createAt = new Date();
    console.log("no such document");

    try {
      await setDoc(userRef, {
        nickName,
        email,
        createAt,
        ...additionalData,
      })
    } catch (error) {
      console.log(error.message);
    }
  }
  return userRef;
};

export const fetchData = async () => {
  const docRef = doc(db, 'data', 'premier league');
  
  const docSnap = await getDoc(docRef);

  return docSnap.data();
}

//add data to the database
export const addData = async (data, docName) => {
  try {
    await setDoc(doc(db, "data", docName), {
      [docName]: data,
      teams: [],
    });
    // await addDoc(collection(db, "data", docName), {
    //   data: fetchedData
    // })
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
//update database data
export const updateData = async (data, docName) => {
  try {
    const leagueData = doc(db, "data", "premier league");

    await updateDoc(leagueData, {
      [docName]: data,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const app = initializeApp(firebaseConfig);

const db = getFirestore();
export const auth = getAuth();

export default app;

// import firebase from "firebase/app";
// import 'firebase/firestore';
// import 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyD7hHLN7B8V_3RqlMpnrrpYzuWTfH0VBP8",
//   authDomain: "ornate-crossbar-281715.firebaseapp.com",
//   databaseURL: "https://ornate-crossbar-281715.firebaseio.com",
//   projectId: "ornate-crossbar-281715",
//   storageBucket: "ornate-crossbar-281715.appspot.com",
//   messagingSenderId: "899156833947",
//   appId: "1:899156833947:web:f0d7c8e5fce4905326f83e",
//   measurementId: "G-MP1T71ETJM"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// export const auth = firebase.auth();
// export const firestore = firebase.firestore();

// export default firebase;
