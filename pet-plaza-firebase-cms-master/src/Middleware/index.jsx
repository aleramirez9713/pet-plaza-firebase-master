import React, { Fragment, useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { NoData } from '../components/organisms';

export const middleware = (limits,role) => {
  if (limits.indexOf(role)!== -1) {
    return true
  } else {
    return false
  }
}

const Middleware = ({ children, limits, role }) => {
  const [status, setstatus] = useState(false);

  useEffect(() => {
    setstatus(middleware(limits, role))
  }, [limits, role]);

  return <Fragment>{status ? children : <Route
    render={() => <NoData notFound /> }
  />}</Fragment>;
};

export default Middleware;
