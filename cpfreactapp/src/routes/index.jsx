import { Route, Routes } from "react-router-dom";

import AboutTech from "../pages/About/AboutTech";
import Analystics from "../pages/Analystics/Analystics";
import Home from "../pages/Home/Home";
import FormLogin from "../pages/Login/FormLogin";
import RegisterForm from "../pages/Register/RegisterForm";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<FormLogin />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/aboutTech" element={<AboutTech />} />
      <Route path="/analystics" element={<Analystics />} />
    </Routes>
  );
}
