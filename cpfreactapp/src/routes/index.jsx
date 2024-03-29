import { Route, Routes } from "react-router-dom";

import AboutTech from "../pages/About/AboutTech";
import Analystics from "../pages/Analystics/Analystics";
import Home from "../pages/Home/Home";
import FormLogin from "../pages/Login/FormLogin";
import RegisterForm from "../pages/Register/RegisterForm";
import UsersForm from "../pages/Users/Users";
import { useContext } from "react";
import { Context } from "../Context";

export function AppRoutes() {
  const { userContext } = useContext(Context);

  return (
    <Routes>
      <Route path="/" element={<FormLogin />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/analystics" element={<Analystics />} />
    </Routes>
  );
}
