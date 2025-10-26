import { createContext, useContext, useEffect, useMemo, useState } from "react";
import baseUser from "../data/user";

const AuthContext = createContext(null);
const STORAGE_KEY = "student-notes:session";

function readStoredUser() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn("Не удалось прочитать сессию пользователя", error);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => readStoredUser());

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (currentUser) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [currentUser]);

  const login = (overrides = {}) => {
    const user = { ...baseUser, ...overrides };
    setCurrentUser(user);
    return user;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateUser = (updates) => {
    setCurrentUser((prev) => {
      if (!prev) {
        return prev;
      }
      const nextState = typeof updates === "function" ? updates(prev) : { ...prev, ...updates };
      return nextState;
    });
  };

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated: Boolean(currentUser),
      login,
      logout,
      updateUser,
    }),
    [currentUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth должен вызываться из-под AuthProvider");
  }
  return context;
}
