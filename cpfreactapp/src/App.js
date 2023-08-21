import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { AppRoutes } from "./routes";
import { ContextProvider } from "./Context";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <AppRoutes />
        <ToastContainer />
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
