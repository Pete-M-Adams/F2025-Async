// SearchButton.tsx
import Button from "@mui/material/Button";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { createTheme, ThemeProvider } from "@mui/material/styles";

type Props = {
  onClick: () => void;
  disabled?: boolean;
};

// 🎨 Customize the button's appearance + font
const buttonTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "16px 16px",
          margin: "16px",
          fontSize: "1.25rem",
          fontFamily:
            '"Urbanist", system-ui, Avenir, Helvetica, Arial, sans-serif',
          fontWeight: 500,
          backgroundColor: "deepskyblue",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textTransform: "none", // keeps font’s natural shape
          borderRadius: "12px",
          "&:hover": {
            backgroundColor: "dodgerblue",
          },
        },
      },
    },
  },
});

export default function SearchButton({ onClick, disabled }: Props) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ThemeProvider theme={buttonTheme}>
        <Button variant="contained" onClick={onClick} disabled={disabled}>
          <PlayCircleIcon sx={{ mr: 1 }} />
          Search
        </Button>
      </ThemeProvider>
    </div>
  );
}
