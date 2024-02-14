import { Routes, Route, useLocation } from "react-router-dom";

import { Login } from "../pages/login";
import { Register } from "../pages/register";

export default function AuthRoutes() {
  const location = useLocation();
  console.log("path => ", location.pathname);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
