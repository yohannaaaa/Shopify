'use client';
import React, { useContext, useState, useEffect, useRef, createContext, ReactNode } from 'react';
import { auth, firestore } from '../firebase/config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User, UserCredential } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface AuthContextType {
    currentUser: User | null;
    signUp: (email: string, password: string) => Promise<UserCredential>;
    logIn: (email: string, password: string) => Promise<UserCredential>;
    logOut: () => Promise<void>;
    userInfo: { email: string; firstName: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState<{ email: string; firstName: string } | null>(null);

    const signUp = async (email: string, password: string): Promise<UserCredential> => {
        try {
            return await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error('Error signing up:', error);
            throw error;
        }
    };

    const logIn = async (email: string, password: string): Promise<UserCredential> => {
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    };

    const logOut = async (): Promise<void> => {
        try {
            await signOut(auth);
            setCurrentUser(null);
            setUserInfo(null);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            setCurrentUser(user);

            if (user) {
                try {
                    const docRef = doc(firestore, 'users', user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setUserInfo({
                            email: user.email!,
                            firstName: data.Fname || 'User'
                        });
                    }
                } catch (error) {
                    console.error('Error fetching user info:', error);
                }
            } else {
                setUserInfo(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const value = {
        currentUser,
        signUp,
        logIn,
        logOut,
        userInfo
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
