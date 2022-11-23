import React from "react";
import { Login, RecoveryPassword } from "../page";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import { privateRoutes } from "../../consts";
import Middleware from "../../Middleware";
import { Switch, Route } from "react-router-dom";
import { NoData } from '../organisms';
import { useUser } from '../../Context'

const Routes = (props) => {
  const { userInfo } = useUser();
  return (
    <Switch>
      <PrivateRoute authed={false} path="/" exact>
        <>Zona oculta</>
      </PrivateRoute>
      {privateRoutes.map((privateRoute, i) => (
        <PrivateRoute
          key={i}
          authed={props.authed}
          path={privateRoute.location}
          exact={privateRoute.exact}
        >
          <Middleware limits={privateRoute.limits} role={userInfo.role} >{privateRoute.component}</Middleware>
        </PrivateRoute>
      ))}
      <PublicRoute authed={props.authed} path="/login" exact>
        <Login />
      </PublicRoute>
      <PublicRoute authed={props.authed} path="/auth/recovey/:metadata/:user" exact>
        <RecoveryPassword />
      </PublicRoute>
      <Route
        render={() => <NoData notFound /> }
      />
    </Switch>
  );
};
export default Routes;
