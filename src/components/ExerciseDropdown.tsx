import React, { useEffect, useState } from "react";
import { IExercise, editExercise } from "../redux/slices/exerciseSlice";
import exercisesData from "../data/exercises.json";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { editCurrentRoutine } from "../redux/slices/currentRoutineSlice";



const ExerciseDropdown: React.FC<{ exercise: IExercise }> = ({ exercise }) => {
  const [MuscleGroup, setMuscleGroup] = useState<string>(exercise.muscleGroups[0]?exercise.muscleGroups[0]:"abdominals");
  const [ExerciseName, setExerciseName] = useState<string>(exercise.name);
  
  const exercises = exercisesData as Record<string, any[]>

  const dispatch = useAppDispatch();

  const handleMuscleGroupChange = (value: string) => {
    setMuscleGroup(value);
  }
  const handleNameChange = (value: string) => {
    setExerciseName(value);
  }

  useEffect(() => {
    // send the updated state to redux
    dispatch(editExercise({
      ...exercise,
      name: ExerciseName,
      muscleGroups: [MuscleGroup]
    }));
  },[ExerciseName])
  
  return (
    <>
      <FormControl>
      <InputLabel variant="standard" htmlFor={exercise._id}>
        Muscle Group
      </InputLabel>
      <NativeSelect
        defaultValue={exercise.muscleGroups[0]? exercise.muscleGroups[0] : exercises.abdominals[0]["muscle group"]}
        inputProps={{
          name:exercise._id+MuscleGroup,
          id:exercise._id+MuscleGroup
        }}
        onChange={(e) => handleMuscleGroupChange(e.target.value)}
      >
        {Object.keys(exercises).map((m, i) => (
                <option key={m + exercise._id} value={m}>
                  {m}
                </option>
              ))}
      </NativeSelect>
      </FormControl>

      <FormControl>
      <InputLabel variant="standard" htmlFor={exercise._id}>
        Exercise Name
      </InputLabel>
      <NativeSelect
        defaultValue={exercise.name? exercise.name : exercises[MuscleGroup][0].name}
        inputProps={{
          name:exercise._id,
          id:exercise._id
        }}
        onChange={(e) => handleNameChange(e.target.value)}
      >
        {exercises[MuscleGroup].map((e, i) => (
                <option key={e.name + exercise._id} value={e.name}>
                  {e.name}
                </option>
              ))}
      </NativeSelect>
    </FormControl>
    </>
  );
}

export default ExerciseDropdown