import { Navigate, Outlet } from "react-router-dom";
import { useLocalStorage } from "react-use";

const ProtectedRoute = () => {
  const [token] = useLocalStorage("token");

  // Jika tidak ada token, redirect ke login
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  // Jika sudah login, render isi rute
  return <Outlet />;
};

export default ProtectedRoute;
