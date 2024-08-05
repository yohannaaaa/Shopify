'use client';
import React, { ReactNode } from 'react';
import AuthContext from '@/context/AuthContext';
import { useFirebaseAuth } from '@/firebase/useFirebaseAuth';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { currentUser, signUp, logIn, logOut, userInfo, loading } = useFirebaseAuth();

  const value = {
    currentUser,
    signUp,
    logIn,
    logOut,
    userInfo,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
