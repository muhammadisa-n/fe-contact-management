import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import Profile from "./pages/Profile"
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="auth/*">
          <Route index element={<Navigate to="login" />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
