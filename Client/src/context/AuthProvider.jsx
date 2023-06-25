import React, { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from "@mui/material";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const auth = getAuth();
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribed = auth.onIdTokenChanged((user) => {
      if (user?.uid) {
        console.log(user?.uid)
        if (user.accessToken !== localStorage.getItem('accessToken')) {
          window.location.reload()
          localStorage.setItem('accessToken', user.accessToken)
        }
        setUser(user)
        setIsLoading(false)
        return;
      }
      setIsLoading(false)
      setUser({})
      navigate('/login')
      localStorage.clear()
    });
    return () => {
      unsubscribed();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  return (
    <AuthContext.Provider value={{ user, setUser }} >

      {isLoading ? <CircularProgress /> : children}
    </AuthContext.Provider >
  );
};

export default AuthProvider;
