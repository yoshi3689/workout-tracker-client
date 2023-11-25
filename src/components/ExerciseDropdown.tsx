import React, { useEffect, useState } from "react";
import { IExercise } from "../redux/slices/exerciseSlice";
import exercises from "../data/exercises.json";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { editCurrentRoutine } from "../redux/slices/currentRoutineSlice";



const ExerciseDropdown: React.FC<{exerciseId:string, exercise:IExercise }> = ({ exerciseId, exercise }) => {
  const [currentExercise, setCurrentExercise] = useState<IExercise>({...exercise, name:exercises[0].name });
  const routine = useAppSelector(state => {
    return state.persistedReducer.currentRoutine;
  });

  const dispatch = useAppDispatch();


  const handleChange = (value: string) => {
    setCurrentExercise({
      ...currentExercise,
      name: value
    });
  }

  useEffect(() => {
    let tempExercises: IExercise[] = routine.exercises.map(e => {
      if (e._id === exerciseId) return exercise
      else return e
    });
    
    dispatch(editCurrentRoutine({ 
      ...routine,
      exercises: tempExercises
      }));
  },[exercise, exerciseId])
  
  return (
    <FormControl>
      <InputLabel variant="standard" htmlFor={exercise._id+routine._id}>
        Exercise Name
      </InputLabel>
      <NativeSelect
        defaultValue={exercise.name? exercise.name : exercises[0].name}
        inputProps={{
          name:exercise._id+routine._id,
          id:exercise._id+routine._id
        }}
        onChange={(e) => handleChange(e.target.value)}
      >
        {exercises.map((e, i) => (
                <option key={e.name + exerciseId + i} value={e.name}>
                  {e.name}
                </option>
              ))}
      </NativeSelect>
    </FormControl>
  );
}

export default ExerciseDropdown