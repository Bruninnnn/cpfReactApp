import { ThemeProvider, createTheme } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const theme = createTheme({
  overrides: {
    MuiPickersCalendar: {
      // Personalize o fundo do calendário aqui
      root: {
        backgroundColor: "#f0f0f0", // Substitua pela cor desejada
      },
    },
  },
});

function MyDatePicker() {
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <ThemeProvider theme={theme}>
          <DatePicker label={'"month" and "year"'} views={["month", "year"]} />
        </ThemeProvider>
      </LocalizationProvider>
    </div>
  );
}

export default MyDatePicker;
