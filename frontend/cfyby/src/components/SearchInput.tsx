// SearchInput.tsx
import React from "react";
import { TextField, Box } from "@mui/material";

type Props = {
  values: {
    genre: string;
    city: string;
  };
  onChange: (field: "genre" | "country" | "city", value: string) => void;
};

export default function SearchInput({ values, onChange }: Props) {
  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
      <TextField
        label="Genre"
        variant="outlined"
        value={values.genre}
        onChange={(e) => onChange("genre", e.target.value)}
        sx={{ width: "min(60vw, 200px)" }}
      />
      <TextField
        label="City"
        variant="outlined"
        value={values.city}
        onChange={(e) => onChange("city", e.target.value)}
        sx={{ width: "min(60vw, 200px)" }}
      />
    </Box>
  );
}
