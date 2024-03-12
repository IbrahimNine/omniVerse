import { createContext, useCallback, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [noticMsg, setNoticMsg] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  const baseURL = process.env.REACT_APP_SERVER_BASE_URL;

  //________________________________________________________________________________________
  const authLogin = (signInCord) => {
    setLoginLoading(true);
    axios
      .post(
        `${baseURL}/api/auth/login`,
        { ...signInCord },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.status === "success") {
          setUser(res.data.data);

          navigate("/music");
        } else if (res.data.status === "fail") {
          setNoticMsg(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoginLoading(false));
  };

  //________________________________________________________________________________________
  const authRegister = (signInCord) => {
    setRegisterLoading(true);
    axios
      .post(
        `${baseURL}/api/auth/register`,
        { ...signInCord },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          setUser(res);

          navigate("/music");
        } else if (res.data.status === "fail") {
          setNoticMsg(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setRegisterLoading(false));
  };

  //________________________________________________________________________________________
  const authLogout = () => {
    axios
      .delete(`${baseURL}/api/auth/logout`, {
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
      .get(`${baseURL}/api/user`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.status === "success") {
          setUser(res.data.data);
        } else if (res.data.status === "fail") {
          setUser(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [baseURL]);

  //________________________________________________________________________________________
  const deleteUser = (password) => {
    setDeleteLoading(true);
    axios
      .post(
        `${baseURL}/api/user/delete`,
        { ...password },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          setNoticMsg(res.data.data);
          showSettings(false);

          setUser(null);
          navigate("/");
        } else if (res.data.status === "fail") {
          setNoticMsg(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
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
        `${baseURL}/api/user`,
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
        `${baseURL}/api/user/password`,
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
      })
      .finally(() => {
        setUpdateLoading(false);
      });
  };

  return (
    <AuthContext.Provider
      value={{
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
