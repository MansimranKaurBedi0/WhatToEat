import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("token") ? true : false,
  );

  const login = (token) => {
    localStorage.setItem("token", token);

    setIsLogin(true);
  };

  const logout = () => {
    localStorage.removeItem("token");

    setIsLogin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
