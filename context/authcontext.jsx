import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  // Load user session from localStorage on boot if it exists
  useEffect(() => {
    const savedUser = localStorage.getItem('blockforge_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const loginUser = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('blockforge_user', JSON.stringify(userData));
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('blockforge_user');
  };

  return (
    <AuthContext.Provider value={{ currentUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);