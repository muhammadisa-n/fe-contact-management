import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import UserRegister from "./components/User/UserRegister";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/contact-management/register"
            element={<UserRegister />}
          />
        </Route>
        <Route path="/contact-management/dashboard"></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
