import { Route, Routes } from "react-router-dom";

import FormLogin from "../pages/Login/FormLogin";
import Home from "../pages/Home/Home";
import RegisterForm from "../pages/Register/RegisterForm";
import AboutTech from "../pages/About/AboutTech";
import Analystics from "../pages/Analystics/Analystics";



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
