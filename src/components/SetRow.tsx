import React, { useState, useEffect } from "react";

import { ISet, editSet, deleteSet } from '../redux/slices/setsSlice';
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import { IExercise } from "../redux/slices/exerciseSlice";
import { editCurrentRoutine } from "../redux/slices/currentRoutineSlice";

const SetRow: React.FC<{ set: ISet, exercise: IExercise }> = ({
  set, exercise
}) => {
  const dispatch = useAppDispatch();

  const [rest, setRest] = useState(0);
  const [weight, setWeight] = useState(0);
  const [rep, setRep] = useState(0);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>, setState: Function) => {
    console.log(e.currentTarget.value);
    setState(e.currentTarget.value);
    dispatch(editSet({ _id: set._id ,rest, weight, rep: rep }));
  }
  const handleDelete = () => {
    console.log("attempting to remove this set");
    dispatch(deleteSet("place ID here"));
  }
  
  const routine = useAppSelector(state => {
    // for some reason, the exercise aray in this routine is empty
    // console.log(state.persistedReducer.currentRoutine)
    return state.persistedReducer.currentRoutine;
  });

  useEffect(() => {
    // console.log(currentSets);
    // find the exercise to modify its set
    // modify the set array by creating a new one with a new entry to it
    let tempExercises: IExercise[] = routine.exercises.map((e) => {
      if (e._id === exercise._id)
        return {
          ...exercise, sets: exercise.sets.map(s => {
            if (s._id === set._id) return { ...set, rest, rep, weight }
            else return s;
          })
        };
      else return e;
    });
    console.log(tempExercises, routine.exercises);
    dispatch(editCurrentRoutine({
      ...routine,
      exercises: [...tempExercises]
    }));
    // console.log(tempExercises)
  }, [rest, weight, rep]);

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