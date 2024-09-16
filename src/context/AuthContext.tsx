import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserData } from '../utils/GeneralTypes';


interface AuthContextProps {
  currentUser: UserData | null;
  register: (user: UserData) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}


const AuthContext = createContext<AuthContextProps | undefined>(undefined);


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);


  //register
  const register = (newUser: UserData) => {
    const users = JSON.parse(sessionStorage.getItem('users') || '[]');
    users.push(newUser);
    sessionStorage.setItem('users', JSON.stringify(users));
  };



  // Login user
  const login = (email: string, password: string): boolean => {
    const users = JSON.parse(sessionStorage.getItem('users') || '[]');
    const foundUser = users.find((user: UserData) => user.email === email && user.password === password);
    if (foundUser) {
      setCurrentUser(foundUser);
      sessionStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };


  // Logout user
  const logout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout }}>
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
