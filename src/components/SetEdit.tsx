import React, { useState, useEffect } from "react";

import { ISet, addSet, editSet } from '../redux/slices/setsSlice';
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import weights from "../data/weights.json"
import rests from "../data/rests.json"
import reps from "../data/reps.json"


import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { NativeSelect, TableCell, Typography } from "@mui/material";
import { formControlStyle } from "./ExerciseDropdown";

const SetEdit: React.FC<{ set: ISet, exerciseId: string }> = ({ set, exerciseId }) => {
  // const currentSet = useAppSelector(state => state.persistedReducer.sets[exerciseId][set._id]);

  const [rest, setRest] = useState(set.rest);
  const [weight, setWeight] = useState(set.weight);
  const [rep, setRep] = useState(set.rep);

  const dispatch = useAppDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
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
    <TableCell sx={{display:"flex", justifyContent:"space-between", paddingRight: 0}} >
      <FormControl sx={formControlStyle} style={{"marginRight":"8px"}} >
      <InputLabel variant="standard"  htmlFor={"weight-"+set._id+exerciseId}>
          weight
        </InputLabel>
      <NativeSelect
        defaultValue={set.weight}
        inputProps={{
          name:"weight-"+set._id+exerciseId,
          id:"weight-"+set._id+exerciseId
        }}
        onChange={(e) => {
            handleChange(e, setWeight);
          }}
      >
        {weights.map((m, i) => (
                <option key={m + set._id} value={m}>
                  {m}
                </option>
              ))}
      </NativeSelect>
        </FormControl>

      <FormControl sx={formControlStyle} style={{"marginRight":"8px"}}  >
      <InputLabel variant="standard" htmlFor={"rep-"+set._id+exerciseId}>
          rep
        </InputLabel>
      <NativeSelect
        defaultValue={set.rep}
        inputProps={{
          name:"rep-"+set._id+exerciseId,
          id:"rep-"+set._id+exerciseId
        }}
        onChange={(e) => {
            handleChange(e, setRep);
          }}
      >
        {reps.map((m, i) => (
                <option key={m + set._id} value={m}>
                  {m}
                </option>
              ))}
      </NativeSelect>
        </FormControl>
      
      <FormControl sx={formControlStyle} style={{"marginRight":"8px"}} >
      <InputLabel variant="standard" htmlFor={"rep-"+set._id+exerciseId}>
          rest
        </InputLabel>
      <NativeSelect
        defaultValue={set.rest}
        inputProps={{
          name:"rep-"+set._id+exerciseId,
          id:"rep-"+set._id+exerciseId
        }}
        onChange={(e) => {
            handleChange(e, setRest);
          }}
      >
        {rests.map((m, i) => (
                <option key={m + set._id} value={m}>
                  {m}
                </option>
              ))}
      </NativeSelect>
        </FormControl>
    
    </TableCell>
  )
}

export default SetEdit