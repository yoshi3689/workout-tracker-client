import React, { useState, useEffect } from "react";

import { ISet, editSet, deleteSet } from '../redux/slices/setsSlice';
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

const SetEdit: React.FC<{ set: ISet }> = ({ set }) => {
  const [rest, setRest] = useState(set.rest);
  const [weight, setWeight] = useState(set.weight);
  const [rep, setRep] = useState(set.rep);

  const dispatch = useAppDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: Function) => {
    setState(e.currentTarget.value);
  }

  useEffect(() => {
    dispatch(editSet({
      ...set,
      rest,
      weight,
      rep
    }));
  }, [rest, weight, rep])

  return (
    <>
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel shrink={true} htmlFor={"standard-adornment-rep-"+set._id+set.exerciseId}>
          rep
        </InputLabel>
        <Input
          id={"standard-adornment-rep-"+set._id+set.exerciseId}
          value={rep}
          onChange={(e) => {
            handleChange(e, setRep);
          }}
        />
      </FormControl>
      <FormControl></FormControl>
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel shrink={true} htmlFor={"standard-adornment-weight-"+set._id+set.exerciseId}>
          weight
        </InputLabel>
        <Input
          id={"standard-adornment-weight-"+set._id+set.exerciseId}
          endAdornment={<InputAdornment position="end">lbs</InputAdornment>}
          value={weight}
          onChange={(e) => {
            handleChange(e, setWeight);
          }}
        />
      </FormControl>
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel shrink={true} htmlFor={"standard-adornment-rest-"+set._id+set.exerciseId}>
          rest
        </InputLabel>
        <Input
          id={"standard-adornment-rest-"+set._id+set.exerciseId}
          value={rest}
          endAdornment={<InputAdornment position="end">(s)</InputAdornment>}
          onChange={(e) => {
            handleChange(e, setRest);
          }}
        />
      </FormControl>
    </>
  )
}

export default SetEdit