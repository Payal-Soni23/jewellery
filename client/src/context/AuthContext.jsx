import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { login as loginRequest, register as registerRequest } from "../api/auth";
import { clearAuthStorage, getStoredToken, getStoredUser, hasStoredSession, setAuthStorage } from "../utils/authStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredUser());
  const [loading, setLoading] = useState(true);
  const token = getStoredToken();

  useEffect(() => {
    setUser(getStoredUser());

    if (!hasStoredSession()) {
      clearAuthStorage();
      setUser(null);
    }

    const handleExternalLogout = () => {
      setUser(null);
    };

    window.addEventListener("auth:logout", handleExternalLogout);
    setLoading(false);

    return () => {
      window.removeEventListener("auth:logout", handleExternalLogout);
    };
  }, []);

  const register = async (name, email, password) => {
    const data = await registerRequest({ name, email, password });
    setUser(data.user);
    setAuthStorage({ token: data.token, user: data.user });
    return data;
  };

  const login = async (email, password) => {
    const data = await loginRequest({ email, password });
    setUser(data.user);
    setAuthStorage({ token: data.token, user: data.user });
    return data;
  };

  const logout = () => {
    setUser(null);
    clearAuthStorage();
    window.dispatchEvent(new Event("auth:logout"));
  };

  const value = useMemo(
    () => ({
      user,
      token,
      userId: user?.id || user?._id || "",
      loading,
      isAuthenticated: Boolean(user && token),
      login,
      register,
      logout,
    }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
