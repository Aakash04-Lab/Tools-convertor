import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const setAuth = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setTokenState(data.token); setUser(data.user);
  };
  const logout = () => { localStorage.clear(); setTokenState(null); setUser(null); };
  return <AuthContext.Provider value={{ token, user, setAuth, logout }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);
