import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Autocomplete,
} from "@mui/material";

type Props = {
  onSearch: (values: { genre: string; location: string }) => void;
  loading: boolean;
};

export default function SearchForm({ onSearch, loading }: Props) {
  const [locationOptions] = useState([
    { location: "Gary, United States" },
    { location: "Hollywood, United States" },
    { location: "Long Branch, United States" },
  ]);

  const [genreOptions] = useState(["Rock", "Hip Hop", "Jazz", "Pop", "Country"]);

  const [values, setValues] = useState({
    genre: "",
    location: "",
  });

  const handleInputChange = (
    field: "genre" | "location",
    value: string
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleClick = () => {
    onSearch(values);
  };

  const isDisabled = loading || !values.genre;

  return (
    <Box
      sx={{
        bgcolor: "white",
        boxShadow: 4,
        borderRadius: 3,
        p: 4,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "stretch", md: "center" },
        gap: 2,
        minWidth: { xs: "90vw", md: "800px" },
        maxWidth: { xs: "90vw", md: "800px" },
        "& .MuiOutlinedInput-root": {
          backgroundColor: "rgba(255,255,255,0.9)",
          borderRadius: "10px",
          "& fieldset": { borderColor: "black" },
          "&:hover fieldset": { borderColor: "black" },
          "&.Mui-focused fieldset": { borderColor: "black" },
        
        },
      }}
    >
      <Autocomplete
        disablePortal = {false}
        options={locationOptions}
        getOptionLabel={(option) => `${option.location}`}
        sx={{ width: 250 }}
        slotProps={{
          paper: {
            sx: {
              bgcolor: "white",
              color: "black",
            }
          }
        }}
        value={
          values.location ? { location: values.location} : null
        }
        onChange={(_, newValue) => {
          if (newValue) {
            handleInputChange("location", newValue.location || "");
          }
        }}
        renderInput={(params) => <TextField {...params} label="Location" />}
      />

      <Autocomplete
        disablePortal = {false}
        options={genreOptions}
        sx={{ width: 250 }}
        slotProps={{
          paper: {
            sx: {
              bgcolor: "white",
              color: "black",
            }
          }
        }}
        value={values.genre || null}
        onChange={(_, newValue) => handleInputChange("genre", newValue || "")}
        renderInput={(params) => <TextField {...params} label="Genre" />}
      />

      <Button
        variant="contained"
        size="large"
        onClick={handleClick}
        disabled={isDisabled}
        endIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
        sx={{
          bgcolor: "#1d88b9ff",
          borderRadius: "20px",
          fontWeight: 600,
          px: 3,
          "&:hover": { bgcolor: "#1d88b9ff" },
        }}
      >
        {loading ? "Searching..." : "Search"}
      </Button>
    </Box>
  );
}
