import React, { createContext, useEffect, useState } from 'react'
import app from '../firebase/firebase.config';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithEmailAndPassword, signOut } from "firebase/auth";


export const AuthContext = createContext();
const auth = getAuth(app);

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        return signOut(auth)
    }

    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        createUser,
        loginWithGoogle,
        login,
        logOut
    }

  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}
 