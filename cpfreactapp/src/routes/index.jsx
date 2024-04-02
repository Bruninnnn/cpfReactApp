import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

import Analystics from "../pages/Analystics/Analystics";
import Home from "../pages/Home/Home";
import FormLogin from "../pages/Login/FormLogin";
import RegisterForm from "../pages/Register/RegisterForm";

import { useContext } from "react";
import { Context } from "../Context";
import Layout from "../components/Layout";


export function AppRoutes() {
  const { userContext } = useContext(Context);

  return (
    <Routes>
      <Route path="/" element={<FormLogin />} /> 
      <Route path="/home" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/home/reports" element={<Analystics />} />
      </Route>
      <Route path="/register" element={<RegisterForm />} />
    </Routes>
  );
}
