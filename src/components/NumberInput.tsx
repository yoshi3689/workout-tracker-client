import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

export default function InputAdornments() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [rest, setRest] = React.useState(0);
  const [weight, setWeight] = React.useState(0);
  const [reps, setReps] = React.useState(0);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <div>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-rest">rest</InputLabel>
          <Input
            id="standard-adornment-rest"
            startAdornment={<InputAdornment position="start">seconds</InputAdornment>}
          />

          <InputLabel htmlFor="standard-adornment-weight">weight</InputLabel>
          <Input
            id="standard-adornment-weight"
            startAdornment={<InputAdornment position="start">lbs</InputAdornment>}
          />
          <InputLabel htmlFor="standard-adornment-reps">reps</InputLabel>
          <Input
            id="standard-adornment-reps"
            startAdornment={<InputAdornment position="start">times</InputAdornment>}
          />
          <TextField
            label="With normal TextField"
            id="outlined-start-adornment"
            sx={{ m: 1, width: "25ch" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">kg</InputAdornment>
              ),
            }}
          />
        </FormControl>
      </div>
    </Box>
  );
}


