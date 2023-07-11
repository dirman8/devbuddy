import { useState, useEffect } from "react";
import firebase from "../db/firebaseConfig";

const formatAuthUser = (user) => ({
    uid: user.uid,
    email: user.email
})

export default function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const authStateChanged = async (authState) => {
        if(!authState) {
            setAuthUser(null)
            setLoading(false)
            return;
        }
        
        setLoading(true)
        var formattedUser = formatAuthUser(authState)
        setAuthUser(formattedUser)
        setLoading(false);
    }
     
    const clear = () => {
        setAuthUser(null);
        setLoading(true);
    };

    const createUserWithEmailAndPassword = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);
    const signInWithEmailAndPassword = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);
    const signOut = () => firebase.auth().signOut().then(clear);
    const createUsersCollection = () => firebase.firestore().collection('users').doc(authUser.uid).set({
        email: authUser.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    //listen for Firebase state change
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(authStateChanged);
        return () => unsubscribe();
    },[]);

    return {
        authUser, 
        loading,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        createUsersCollection
    }
    }
