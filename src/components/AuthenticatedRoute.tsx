import React, { FC, useContext, useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { getAuthUser } from "../utils/api";
import { User } from "../utils/types";
import { AuthContext } from "../utils/context/AuthContext";

export const AuthenticatedRoute: FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { user, updateAuthUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const controller = new AbortController();
  const location = useLocation();
  useEffect(() => {
    getAuthUser()
      .then(({ data }) => {
        updateAuthUser(data);
        setTimeout(() => setLoading(false), 1000);
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => setLoading(false), 1000);
      });
    return () => {
      controller.abort();
    };
  }, []);
  if (loading) {
    return <div>loading</div>;
  } else {
    if (user) return <>{children}</>;
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};
