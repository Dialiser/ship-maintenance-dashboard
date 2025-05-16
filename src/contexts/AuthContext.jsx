import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const users = [
  { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" },
  {
    id: "2",
    role: "Inspector",
    email: "inspector@entnt.in",
    password: "inspect123",
  },
  {
    id: "3",
    role: "Engineer",
    email: "engineer@entnt.in",
    password: "engine123",
  },
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
