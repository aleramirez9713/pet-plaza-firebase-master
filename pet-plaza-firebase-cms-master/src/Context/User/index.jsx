import React, { useState, useMemo, useContext } from "react";

const UserContext = React.createContext();

export const UserProvider = (props) => {
  const [userInfo, setuserInfo] = useState({});
  const [usersPlataform, setusersPlataform] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const values = useMemo(() => {
    return {
      userInfo,
      setuserInfo,
      usersPlataform,
      setusersPlataform,
      notifications,
      setNotifications
    };
  }, [userInfo, usersPlataform, notifications]);

  return <UserContext.Provider value={values} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUser tiene que usarse dentro del proveedor UserContext"
    );
  }
  return context;
};
