import React, { useLayoutEffect, useState, useEffect } from "react";
import { firebaseAppSingOut, firebaseAppListener } from "../../../Firebase";
import { BrowserRouter as Router } from "react-router-dom";
import logo from "../../../media/logo.png";
import { Loading } from "../../molecules";
import { THome } from "../../templates";
import Routes from "../../routes";
import { sideMenuOptions } from "../../../consts";
import { message, info } from "../../atoms";
import {
  initOneSignal,
  getUserIdOneSignal,
  listenerNotifications,
  isPushNotificationsEnabled,
} from "../../../OneSignal";
import { useUser, UserProvider } from "../../../Context";
import {
  getToken,
  verifyAuthentication,
  getRoles,
  getAllUsers,
  manageTokenOneSignal
} from "../../../hooks";

import "./style.css";

const Home = () => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const {
    userInfo,
    setuserInfo,
    setusersPlataform,
    notifications,
    setNotifications,
  } = useUser();

  const getIdOneSignal = async (setuserInfo) => {
    await getUserIdOneSignal(async (id) => {
      let token = await getToken()
      await manageTokenOneSignal(token.token, id, "in");
      setuserInfo((prevState) => ({
        ...prevState,
        onSignalId: id,
      }));
    });
  };

  const RemoveListener = async (setuserInfo) => {
    const err = () => {
      message.error("Usuario no válido");
      firebaseAppSingOut();
    };
    firebaseAppListener(async (user) => {
      setLoading(true);
      if (user) {
        let token = await getToken();
        let response = await verifyAuthentication(token.token);
        if (response.success) {
          let roles = await getRoles();
          if (
            (roles.indexOf(response.data.role.slug) > -1 ||
              response.data.role.slug === "médico") &&
            !user.providerData[0].disabled
          ) {
            setuserInfo({
              ...response.data,
              displayName: response.data.fullName,
              role: response.data.role.slug,
              photoURL: response.data.profile,
              email: user.email,
            });
            setAuth(true);
            message.success("Bienvenido(a) a PetPlaza Admin");
          } else {
            err();
          }
        } else {
          err();
        }
      } else {
        setAuth(false);
        firebaseAppSingOut();
      }
      setLoading(false);
    });
  };

  const saveAllUsersPlataform = async (setusersPlataform) => {
    let token = await getToken();
    let users = await getAllUsers(token.token);
    setusersPlataform(users.users);
  };

  useEffect(() => {
    if (!userInfo.onSignalId && userInfo.id) {
      isPushNotificationsEnabled((status) => {
        if (status) {
          getIdOneSignal(setuserInfo);
        } else {
          info({
            title: <b>Importante</b>,
            width: 600,
            content: (
              <div>
                <span>Debe permitir recibir notificaciones</span>
                <p>Si no, no podra recibir notificacione de nuevas ordenes</p>
                <br />
                <p>
                  CONSEJO: Si el cuadro para permitir notificaciones no aparece,
                  revice la configuración de sitios web, y permita recibir
                  notificaciones de este sitio web
                </p>
              </div>
            ),
            onOk() {},
          });
        }
      });
    }
  }, [userInfo, setuserInfo]);

  useEffect(() => {
    if (auth) {
      saveAllUsersPlataform(setusersPlataform);
    }
  }, [setusersPlataform, auth]);

  useLayoutEffect(() => {
    initOneSignal(); // oneSignal no funciona en localhost
    RemoveListener(setuserInfo);
  }, [setuserInfo]);

  listenerNotifications((msj) => {
    let temp = notifications.filter((e) => e.id === msj.id);
    if (temp.length === 0) {
      setNotifications([...notifications, msj]);
    }
  });

  const signOut = async () => {
    setLoading(true);
    let token = await getToken();
    let remove = await manageTokenOneSignal(token.token, userInfo.onSignalId, "out");
    if (remove.success) {
      firebaseAppSingOut();
      setuserInfo({});
    }else{
      message.error(remove.error);
    }
    setLoading(false);
  };

  return (
    <Router>
      <THome
        classImg="Logo"
        sourceImg={logo}
        onClick={signOut}
        authed={auth}
        sideMenuOptions={sideMenuOptions}
        component={!loading ? <Routes authed={auth} /> : <Loading />}
        text={`© ${new Date().getFullYear()} Copyright PET PLAZA`}
      />
    </Router>
  );
};
export default () => (
  <UserProvider>
    <Home />
  </UserProvider>
);
