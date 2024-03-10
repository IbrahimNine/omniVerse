import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const navigate = useNavigate();

  //________________________________________________________________________________________
  const authLogin = (signInCord) => {
    setLoginLoading(true);
    axios
      .post("http://localhost:5050/api/auth/login", { ...signInCord })
      .then((res) => {
        console.log(res);
        setUser(res);
        if (res.data.status === "success") {
          setIsAuthenticated(true);
          navigate("/music");
          setLoginLoading(false);
        } else if (res.data.status === "fail") {
          setLoginLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsAuthenticated(false);
        setLoginLoading(false);
      });
  };

  //________________________________________________________________________________________
  const authRegister = (signInCord) => {
    setRegisterLoading(true);
    axios
      .post("http://localhost:5050/api/auth/register", { ...signInCord })
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          setUser(res);
          setIsAuthenticated(true);
          navigate("/music");
          setRegisterLoading(false);
        } else if (res.data.status === "fail") {
          setRegisterLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsAuthenticated(false);
        setRegisterLoading(false);
      });
  };

  //________________________________________________________________________________________
  const authLogout = () => {
    axios
      .delete("http://localhost:5050/api/auth/logout", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.status === "success") {
          navigate("/");
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        authLogin,
        authRegister,
        loginLoading,
        registerLoading,
        authLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
