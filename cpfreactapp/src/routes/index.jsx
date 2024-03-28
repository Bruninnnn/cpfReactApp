import { Route, Routes } from "react-router-dom";

import Analystics from "../pages/Analystics/Analystics";
import Home from "../pages/Home/Home";
import FormLogin from "../pages/Login/FormLogin";
import RegisterForm from "../pages/Register/RegisterForm";
import UsersForm from "../pages/Users/Users";
import { useContext } from "react";
import { Context } from "../Context";
import SideBar from "../components/SideBar";

export function AppRoutes() {
  const { userContext } = useContext(Context);
  console.log(userContext?.isAdmin);
  
  return (
    <Routes>
      <Route path="/" element={<FormLogin />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<RegisterForm />} />
      {userContext?.isAdmin && <Route path='/sidebar' element={<SideBar />} />}
      <Route path="/reports" element={<Analystics />} />
    </Routes>
  );
}
