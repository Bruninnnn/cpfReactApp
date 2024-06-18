import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import FormLogin from "../pages/Login/FormLogin";
import Layout from "../components/Layout";
import DashBoard from "../pages/DashBoard/DashBoard";
import Reports from "../pages/Reports/Reports";
import Goals from "../pages/Goals/Goals";
import BankAccount from "../pages/BankAccount/BankAccount";
import RegisterForm from "../pages/Register/RegisterForm";

import { Context } from "../Context";
import { GoalsDetails } from "../pages/Goals/GoalsDetails";


export function AppRoutes() {
  const { userContext } = useContext(Context);

  return (
    <Routes>
      <Route path="/" element={<FormLogin />} />
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<DashBoard />} />
        <Route path="/dashboard/reports" element={<Reports />} />
        <Route path="/dashboard/goals" element={<Goals />} />
        <Route path="/dashboard/goals/details" element={<GoalsDetails />} />
        <Route path="/dashboard/bankaccount" element={<BankAccount />} />
      </Route>
      <Route path="/register" element={<RegisterForm />} />
    </Routes>
  );
}
