import { Routes, Route } from "react-router-dom";

import { Login } from "@/pages/login";
import { Register } from "@/pages/register";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
