import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged as firebaseOnAuthStateChanged, signInWithEmailAndPassword as firebaseSignIn, signOut as firebaseSignOut } from '../services/firebaseService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebaseOnAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = (user) => {
    setUser(user);
    setLoading(false);
  };

  const logout = async () => {
    await firebaseSignOut();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};