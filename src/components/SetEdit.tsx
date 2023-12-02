import React, { useState, useEffect } from "react";

import { ISet, addSet, editSet } from '../redux/slices/setsSlice';
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

const SetEdit: React.FC<{ set: ISet, exerciseId: string }> = ({ set, exerciseId }) => {
  // const currentSet = useAppSelector(state => state.persistedReducer.sets[exerciseId][set._id]);

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
    dispatch(
      editSet({
      set: {
        ...set,
        rest,
        weight,
        rep
      },
      exerciseId
    }));
  }, [rest, weight, rep]
  )

  return (
    <>
      <FormControl component={"td"} variant="standard">
        <InputLabel shrink={true} htmlFor={"standard-adornment-rep-"+set._id+exerciseId}>
          rep
        </InputLabel>
        <Input
          
          type="number"
          id={"standard-adornment-rep-"+set._id+exerciseId}
          value={rep}
          onChange={(e) => {
            handleChange(e, setRep);
          }}
        />
      </FormControl>
      
      <FormControl component={"td"} variant="standard">
        <InputLabel shrink={true} htmlFor={"standard-adornment-weight-"+set._id+exerciseId}>
          weight
        </InputLabel>
        <Input
        type="number"
          id={"standard-adornment-weight-"+set._id+exerciseId}
          endAdornment={<InputAdornment position="end">lbs</InputAdornment>}
          value={weight}
          onChange={(e) => {
            handleChange(e, setWeight);
          }}
        />
      </FormControl>
      <FormControl component={"td"} variant="standard">
        <InputLabel shrink={true} htmlFor={"standard-adornment-rest-"+set._id+exerciseId}>
          rest
        </InputLabel>
        <Input
        type="number"
          id={"standard-adornment-rest-"+set._id+exerciseId}
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