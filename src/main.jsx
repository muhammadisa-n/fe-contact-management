import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/Main/MainLayout";
import DashboardLayout from "./layouts/Dashboard/DashboardLayout";

import UserRegister from "./pages/User/UserRegister";
import UserLogin from "./pages/User/UserLogin";
import UserProfile from "./pages/User/UserProfile";
import UserLogout from "./pages/User/UserLogout";
import ContactCreate from "./pages/contact/ContactCreate";
import ContactList from "./pages/contact/ContactList";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/contact-management/">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="auth/register" element={<UserRegister />} />
          <Route path="auth/login" element={<UserLogin />} />
        </Route>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route path="users">
            <Route path="profile" element={<UserProfile />} />
            <Route path="logout" element={<UserLogout />} />
          </Route>
          <Route path="contacts">
            <Route index element={<ContactList />} />
            <Route path="create" element={<ContactCreate />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
