import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

function PrrivateRoute() {
  const { user } = useAuthContext();

  return user === undefined || user === null ? (
    <Navigate to={"/login"} />
  ) : (
    <Outlet />
  );
}

export default PrrivateRoute;
