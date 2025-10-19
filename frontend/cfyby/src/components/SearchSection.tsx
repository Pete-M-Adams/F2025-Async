// SearchSection.tsx
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import SearchButton from "./SearchButton";
import SearchInput from "./SearchInput";
import ResultList from "./ResultList";

type Artist = {
  name: string;
  city: string;
  country: string;
};

export default function SearchSection() {
  const [values, setValues] = useState({ genre: "", country: "", city: "" });
  const [results, setResults] = useState<Artist[]>([]); // <-- Updated type
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: "genre" | "country" | "city", value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      
      if (values.genre.trim()) params.append("genre", values.genre);
      if (values.city.trim()) params.append("city", values.city);
      params.append("n", "50");
      const request_url = `/artists/city?${params.toString()}`;
      console.log("Request URL:", request_url);
      // Replace with your real API URL
      const response = await fetch(request_url);
      const data = await response.json();

      // Assume your API returns an array of strings
      setResults(data.results || []);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };
    
  const isDisabled = loading || (!values.genre);

  return (
    <Box
      sx={{
        position: "fixed",
        height: "100vh",
        width: "100vw",
        top: 0,
        left: 0,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        alignContent: "stretch",
        padding: "1rem",
        justifyContent: "flex-start",
        color: "deepskyblue",
        pt: "25vh",
        pl: "5vw",
        gap: 2,
      }}
    >
      <Typography variant="h4" sx={{ color: "deepskyblue" }}>
        Search
      </Typography>

      {/* Lifted state: pass value and setter to the input */}
      <SearchInput values={values} onChange={handleInputChange} />

      {/* Button receives handler from parent */}
      <SearchButton onClick={handleSearch} disabled={isDisabled} />

      {/* ResultList gets results and loading */}
      <ResultList results={results} loading={loading} />
    </Box>
  );
}
