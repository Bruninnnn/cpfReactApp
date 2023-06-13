import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from "./components/Home/Home";
import Login from "./components/Login/FormLogin";
import Register from "./components/Register/RegisterForm";

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element = {<Login />} />
            <Route path="/home" element = {<Home />}  />
            <Route path="/register" element = {<Register />} />
        </Routes>
    </Router>
  );
}

export default App;
