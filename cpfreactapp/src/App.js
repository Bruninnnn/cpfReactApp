import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Home from "./components/Home/Home";
import Login from "./components/Login/FormLogin";
import Register from "./components/Register/RegisterForm";
import { ContextProvider } from "./Context";
import AboutTech from "./components/About/AboutTech";

function App() {
  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/aboutTech" element={<AboutTech />} />
        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;
