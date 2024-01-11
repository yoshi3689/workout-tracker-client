import React from "react";
import { ISet } from '../redux/slices/setsSlice';

import weights from "../data/weights.json"
import rests from "../data/rests.json"
import reps from "../data/reps.json"

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { NativeSelect, TableCell } from "@mui/material";
import { formControlStyle } from "./ExerciseDropdown";
import { useEditSet } from "../hooks/set/useEditSet";

const SetEdit: React.FC<{ set: ISet, exerciseId: string }> = ({ set, exerciseId }) => {
  const [setWeight, setRep, setRest] = useEditSet(set, exerciseId);
  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setState: React.Dispatch<React.SetStateAction<any>>
  ) => {
    setState(e.currentTarget.value);
  }
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
        onChange={(e) => {handleChange(e, setWeight)}}
      >
        {weights.map((m, i) => (
                <option key={m + set._id+ i} value={m}>
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
        onChange={(e) => {handleChange(e, setRep)}}
      >
        {reps.map((m, i) => (
                <option key={m + set._id+i} value={m}>
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
        onChange={(e) => {handleChange(e, setRest);}}
      >
        {rests.map((m, i) => (
                <option key={m + set._id+i} value={m}>
                  {m}
                </option>
              ))}
      </NativeSelect>
        </FormControl>
    
    </TableCell>
  )
}

export default SetEdit