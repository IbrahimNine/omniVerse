import { createContext, useCallback, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [noticMsg, setNoticMsg] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  //________________________________________________________________________________________
  const authLogin = (signInCord) => {
    setLoginLoading(true);
    axios
      .post(
        "http://localhost:5050/api/auth/login",
        { ...signInCord },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.status === "success") {
          setUser(res.data.data);
          setIsAuthenticated(true);
          navigate("/music");
        } else if (res.data.status === "fail") {
          setNoticMsg(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsAuthenticated(false);
      })
      .finally(() => setLoginLoading(false));
  };

  //________________________________________________________________________________________
  const authRegister = (signInCord) => {
    setRegisterLoading(true);
    axios
      .post(
        "http://localhost:5050/api/auth/register",
        { ...signInCord },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          setUser(res);
          setIsAuthenticated(true);
          navigate("/music");
        } else if (res.data.status === "fail") {
          setNoticMsg(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsAuthenticated(false);
      })
      .finally(() => setRegisterLoading(false));
  };

  //________________________________________________________________________________________
  const authLogout = () => {
    axios
      .delete("http://localhost:5050/api/auth/logout", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.status === "success") {
          setUser(null);
          navigate("/");
        } else if (res.data.status === "fail") {
          setNoticMsg(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  };

  //________________________________________________________________________________________
  const getUserData = useCallback(() => {
    axios
      .get("http://localhost:5050/api/user", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.status === "success") {
          setUser(res.data.data);
          setIsAuthenticated(true);
        } else if (res.data.status === "fail") {
          setUser(null);
          setIsAuthenticated(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsAuthenticated(false);
      });
  }, []);

  //________________________________________________________________________________________
  const deleteUser = (password) => {
    setDeleteLoading(true);
    axios
      .post(
        "http://localhost:5050/api/user/delete",
        { ...password },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          setNoticMsg(res.data.data);
          showSettings(false);
          setIsAuthenticated(false);
          setUser(null);
          navigate("/");
        } else if (res.data.status === "fail") {
          setNoticMsg(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsAuthenticated(false);
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  };
  //________________________________________________________________________________________
  const updateUser = (userCord) => {
    setUpdateLoading(true);
    axios
      .put(
        "http://localhost:5050/api/user",
        { ...userCord },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          setNoticMsg(res.data.message);
          setShowSettings(false);
        } else if (res.data.status === "fail") {
          setNoticMsg(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsAuthenticated(false);
      })
      .finally(() => {
        setUpdateLoading(false);
      });
  };

  //________________________________________________________________________________________
  const updatePassword = (password) => {
    setUpdateLoading(true);
    axios
      .put(
        "http://localhost:5050/api/user/password",
        { ...password },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          setNoticMsg(res.data.data);
          setShowSettings(false);
        } else if (res.data.status === "fail") {
          setNoticMsg(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsAuthenticated(false);
      })
      .finally(() => {
        setUpdateLoading(false);
      });
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
        showSettings,
        setShowSettings,
        noticMsg,
        setNoticMsg,
        getUserData,
        deleteUser,
        deleteLoading,
        updateUser,
        updateLoading,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
