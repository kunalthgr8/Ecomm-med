import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader } from "./index.js";

export default function Protected({
  children,
  authentication = true,
  isAdmin = false,
}) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.userData);
  const userRole = userData?.role || "user";
  const userIsAdmin = userRole === "admin";

  useEffect(() => {
    if (authentication && !authStatus) {
      navigate("/login");
    } else if (!authentication && authStatus) {
      navigate("/");
    } else if (isAdmin && (!authStatus || !userIsAdmin)) {
      navigate("/not-authorized");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication, isAdmin, userIsAdmin]);

  return loader ? <Loader/> : <>{children}</>;
}
