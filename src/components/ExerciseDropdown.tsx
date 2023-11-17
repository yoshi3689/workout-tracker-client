import React, { useEffect, useState } from "react";
import { IExercise } from "../redux/slices/exerciseSlice";
import exercises from "../data/exercises.json";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';


const ExerciseDropdown: React.FC<{setExercise:Function, exercise: IExercise, routineId:string }> = ({ setExercise, exercise, routineId }) => {
  

  const handleChange = (value:string) => {
    setExercise({
      ...exercise,
      exercise: value
    });
  }
  
  return (
    <FormControl>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        Exercise Name
      </InputLabel>
      <NativeSelect
        inputProps={{
          name:"exercise",
          id:"exercise"
        }}
        onChange={(e) => handleChange(e.target.value)}
      >
        {exercises.map((e, i) => (
                <option key={e.name + routineId + i} value={e.name}>
                  {e.name}
                </option>
              ))}
      </NativeSelect>
    </FormControl>
  );
}

export default ExerciseDropdown