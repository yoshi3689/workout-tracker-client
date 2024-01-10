import React from "react";
import { IExercise } from "../redux/slices/exerciseSlice";
import exercisesData from "../data/exercises.json";

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { Box } from "@mui/material";
import {useEditExercise} from "../hooks/useEditExercise";

export const formControlStyle = {
  display: "inline-flex",
  flexDirection: "column",
  position: "relative",
  minWidth: "0",
  padding: "0",
  margin: "0",
  border: "0",
  verticalAlign: "top",
  marginRight: "20px"
}

const ExerciseDropdown: React.FC<{ exercise: IExercise }> = ({ exercise }) => {
  const [MuscleGroup, setMuscleGroup, setExerciseName] = useEditExercise(exercise);

  const handleMuscleGroupChange = (value: string) => {
    setMuscleGroup(value);
  }
  const handleNameChange = (value: string) => {
    setExerciseName(value);
  }
  
  const exercises = exercisesData as Record<string, any[]>
  
  return (
      <Box>
        <FormControl sx={formControlStyle}  >
      <InputLabel variant="standard" htmlFor={exercise._id}>
        Muscle Group
      </InputLabel>
      <NativeSelect
        defaultValue={exercise.muscleGroups[0]? exercise.muscleGroups[0] : exercises.abdominals[0]["muscle group"]}
        inputProps={{
          name:exercise._id+MuscleGroup,
          id:exercise._id+MuscleGroup
        }}
        onSelect={e => e.stopPropagation()}
        onFocus={e => e.stopPropagation()}
        onClick={e => e.stopPropagation()}  
        onChange={(e) => handleMuscleGroupChange(e.target.value)}
      >
        {Object.keys(exercises).map((m, i) => (
                <option key={m + exercise._id} value={m} onClick={e => e.stopPropagation}>
                  {m}
                </option>
              ))}
      </NativeSelect>
        </FormControl>
        <FormControl sx={formControlStyle} style={{"maxWidth":"180px"}}>
      <InputLabel variant="standard" htmlFor={exercise._id}>
        Exercise Name
      </InputLabel>
      <NativeSelect
        defaultValue={exercise.name? exercise.name : exercises[MuscleGroup][0].name}
        inputProps={{
          name:exercise._id,
          id:exercise._id
        }}
        onSelect={e => e.stopPropagation()}
        onFocus={e => e.stopPropagation()}
        onClick={e => e.stopPropagation()}
        onChange={(e) => handleNameChange(e.target.value)}
      >
        {exercises[MuscleGroup].map((e, i) => (
                <option key={e.name + exercise._id} value={e.name}>
                  {e.name}
                </option>
              ))}
      </NativeSelect>
    </FormControl>
      </Box>
  );
}

export default ExerciseDropdown