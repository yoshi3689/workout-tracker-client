import React, { useEffect, useState } from 'react'

import ExerciseRow from './ExerciseRow';
import { IRoutine } from '../redux/slices/routineSlice';

import { useAppDispatch, useAppSelector } from "../redux/hooks";

import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IExercise } from '../redux/slices/exerciseSlice';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { editCurrentRoutine } from '../redux/slices/currentRoutineSlice';
import { generateObjectId } from '../utils/idGenerator';

const ExerciseRows: React.FC<{ isNew: boolean }> = ({ isNew }) => {
  const currentExercises = useAppSelector(state => state.persistedReducer.currentRoutine.exercises);

  // I should not have to fetch routine here
  // but rn I need to do so since the exercises are nested in the routine state
  const routine = useAppSelector(state => state.persistedReducer.currentRoutine);
  const [exerciseId, setExerciseId] = useState<string>("");

  // since the exercises brought down from the parent are set as ONLY initial
  // they do not get updated whenever the redux state has changed

  const [exercises, setExercises] = useState<IExercise[]>(currentExercises);


  const dispatch = useAppDispatch();


  // add a new exercise tuple
  const handleAdd = () => {
    const newId = generateObjectId();
    setExerciseId(newId);

    const newExercise:IExercise = { _id: newId, name: "", sets: [], muscleGroups: [""] };
    setExercises([
      ...currentExercises,
      newExercise,
    ]);
  };

  useEffect(() => {
    // assigning a new exercise to the record of exercises
    let tempExercises: IExercise[] = exercises;
    if (!isNew) console.debug("past routine load")
    dispatch(editCurrentRoutine({
      ...routine,
      exercises: [...tempExercises]
    }));
  }, [exercises]);
  return (
    <>
      <TableRow>
        <TableCell/>
          <TableCell>
            <Box display="flex" alignItems="center">
              <Typography>Exercises</Typography>
            <IconButton color="primary" onClick={handleAdd}>
              <AddCircleIcon />
            </IconButton>
            </Box>
          </TableCell>
          <TableCell/>
        </TableRow>
        <TableCell/>
        {currentExercises.map((exercise, i) => (
        <ExerciseRow
          exercise={exercise}
          routineId={exercise._id}
          key={i + "" + exercise._id}
        />
      ))}
    </>
  )
}

export default ExerciseRows