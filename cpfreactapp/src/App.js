import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { AppRoutes } from "./routes";
import { ContextProvider } from "./Context";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <BrowserRouter>
        <ContextProvider>
          <AppRoutes />
          <ToastContainer />
        </ContextProvider>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
