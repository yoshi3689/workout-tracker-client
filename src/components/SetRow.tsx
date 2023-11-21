import React, { useState } from 'react'

import { ISet, editSet, deleteSet } from '../redux/slices/setsSlice';
import { useAppDispatch } from "../redux/hooks";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

const SetRow: React.FC<{ set: ISet }> = ({
  set
}) => {
  const dispatch = useAppDispatch();

  const [rest, setRest] = useState(0);
  const [weight, setWeight] = useState(0);
  const [rep, setRep] = useState(0);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>, setState: Function) => {
    console.log(e.currentTarget.value);
    setState(e.currentTarget.value);
    dispatch(editSet({ ID: "" ,rest, weight, rep: rep }));
  }
  const handleDelete = () => {
    console.log("attempting to remove this set");
    dispatch(deleteSet("place ID here"));
  }
  return (
    <Box display="flex" className={`set`}>
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel shrink={true} htmlFor="standard-adornment-rep">
          rep
        </InputLabel>
        <Input id="standard-adornment-rep" onChange={(e) => {
          handleChange(e, setRep);
        }} />
      </FormControl>
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel shrink={true} htmlFor="standard-adornment-weight" >
          weight
        </InputLabel>
        <Input
          id="standard-adornment-weight"
          endAdornment={<InputAdornment position="end">lbs</InputAdornment>}
          onChange={(e) => {
          handleChange(e, setWeight);
        }}
        />
      </FormControl>
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel shrink={true} htmlFor="standard-adornment-rest">
          rest
        </InputLabel>
        <Input
          id="standard-adornment-rest"
          endAdornment={<InputAdornment position="end">(s)</InputAdornment>}
          onChange={(e) => {
          handleChange(e, setRest);
        }}
        />
      </FormControl>
      <IconButton className="mt-1" color="secondary" onClick={handleDelete}>
        <ClearIcon />
      </IconButton>
    </Box>
  );
};

export default SetRow