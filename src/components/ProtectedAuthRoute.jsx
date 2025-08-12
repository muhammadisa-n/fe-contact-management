// components/ProtectedAuthRoute.jsx
import { Navigate } from "react-router-dom";
import { useLocalStorage } from "react-use";
import axios from "axios";
import { useEffect, useState } from "react";

const ProtectedAuthRoute = ({ children }) => {
  const mode = import.meta.env.VITE_NODE_ENV;
  const [token] = useLocalStorage("token");
  const [loading, setLoading] = useState(mode === "production");
  const [isAuth, setIsAuth] = useState(mode === "development" && !!token);

  useEffect(() => {
    if (mode !== "production") return;

    const checkSSO = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_API_URL}/verify-sso`,
          { withCredentials: true }
        );
        if (res.status === 200) setIsAuth(true);
      } catch {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkSSO();
  }, [mode]);

  if (loading) return <p>Loading...</p>;

  if (isAuth) {
    return <Navigate to="/dashboard" replace />;
  }

  if (mode === "production") {
    const redirectUrl = `${import.meta.env.VITE_PANEL_LOGIN}/login?redirect=${
      window.location.href
    }/dashboard`;
    window.location.href = redirectUrl;
    return null;
  }

  return children;
};

export default ProtectedAuthRoute;
