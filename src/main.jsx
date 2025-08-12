import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import MainLayout from "./layouts/Main/MainLayout";
import DashboardLayout from "./layouts/Dashboard/DashboardLayout";

import UserRegister from "./pages/User/UserRegister";
import UserLogin from "./pages/User/UserLogin";
import UserProfile from "./pages/User/UserProfile";
import UserLogout from "./pages/User/UserLogout";
import ContactList from "./pages/Contact/ContactList";
import ContactCreate from "./pages/Contact/ContactCreate";
import ContactDetail from "./pages/Contact/ContactDetail";
import ContactEdit from "./pages/Contact/ContactEdit";
import AddressCreate from "./pages/Address/AddressCreate";
import AddressEdit from "./pages/Address/AddressEdit";
import ProtectedRoute from "./components/ProtectedRoutes";
import ErrorNotFoundPage from "./pages/Error/404";
import ProtectedAuthRoute from "./components/ProtectedAuthRoute";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/contact-management/">
      <Routes>
        <Route path="/" element={<Navigate to="auth/login" replace />} />
        <Route element={<MainLayout />}>
          <Route
            path="auth/register"
            element={
              <ProtectedAuthRoute>
                <UserRegister />
              </ProtectedAuthRoute>
            }
          />
          <Route
            path="auth/login"
            element={
              <ProtectedAuthRoute>
                <UserLogin />
              </ProtectedAuthRoute>
            }
          />
        </Route>

        <Route path="dashboard" element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="users">
              <Route path="profile" element={<UserProfile />} />
              <Route path="logout" element={<UserLogout />} />
            </Route>
            <Route path="contacts">
              <Route index element={<ContactList />} />
              <Route path="create" element={<ContactCreate />} />
              <Route path=":id">
                <Route index element={<ContactDetail />} />
                <Route path="edit" element={<ContactEdit />} />
                <Route path="addresses">
                  <Route path="create" element={<AddressCreate />} />
                  <Route path=":addressId/edit" element={<AddressEdit />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<ErrorNotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
