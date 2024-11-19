import React, { createContext, useState, ReactNode, useContext } from 'react';

interface AuthContextType {
  displayName: string;
  setDisplayName: (name: string) => void;
  username: string;
  setUsername: (name: string) => void;
  // Add other shared state variables as needed
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');

  return (
    <AuthContext.Provider value={{ displayName, setDisplayName, username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within an AuthProvider');
  return context;
};
