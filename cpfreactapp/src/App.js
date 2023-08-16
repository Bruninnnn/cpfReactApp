import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Home from "./components/Home/Home";
import Login from "./components/Login/FormLogin";
import Register from "./components/Register/RegisterForm";
import AboutTech from "./components/About/AboutTech";
import Analystics from "./components/Home/Analystics";

import { ContextProvider } from "./Context";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/aboutTech" element={<AboutTech />} />
          <Route path="/analystics" element={<Analystics />} />
        </Routes>
      </Router>
      <ToastContainer />
    </ContextProvider>
  );
}

export default App;
