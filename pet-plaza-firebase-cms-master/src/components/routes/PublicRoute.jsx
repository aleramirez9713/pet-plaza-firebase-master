import React from "react";
import { Redirect, Route } from "react-router-dom";

const PublicRoute = ({ children, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authed === false ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: `/config`,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
export default PublicRoute;
