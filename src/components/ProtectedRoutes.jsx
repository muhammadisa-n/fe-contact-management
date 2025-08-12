import { Navigate, Outlet } from "react-router-dom";
import { useLocalStorage } from "react-use";
import axios from "axios";
import { useEffect, useState } from "react";
const ProtectedRoute = () => {
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
      } catch (err) {
        setIsAuth(false);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    checkSSO();
  }, [mode]);

  if (loading) return <p>Loading...</p>;

  if (!isAuth) {
    if (mode === "development") {
      return <Navigate to="/auth/login" replace />;
    } else {
      const ssoLoginUrl = `${
        import.meta.env.VITE_PANEL_LOGIN
      }/login?redirect=${encodeURIComponent(window.location.href)}`;
      window.location.href = ssoLoginUrl;
      return null;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
