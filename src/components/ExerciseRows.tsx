import React, { useEffect, useState } from 'react'

import ExerciseRow from './ExerciseRow';
import { IRoutine } from '../redux/slices/routineSlice';

import { useAppDispatch, useAppSelector } from "../redux/hooks";

import exerciseData from "../data/exercises.json"

import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IExercise, addExercise, exerciseSkelton } from '../redux/slices/exerciseSlice';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { generateObjectId } from '../utils/idGenerator';
import { ISet, setSkelton, addSet } from '../redux/slices/setsSlice';

const ExerciseRows: React.FC<{ isNew: boolean }> = ({ isNew }) => {
  const currentExercises = useAppSelector(state => state.persistedReducer.exercises);

  const [exerciseId, setExerciseId] = useState<string>("");
  const [setId, setSetId] = useState<string>("");

  const dispatch = useAppDispatch();

  // add a new exercise and a set
  const handleAdd = () => {
    const newExerciseId = generateObjectId();
    const newSetId = generateObjectId();

    setExerciseId(newExerciseId);
    setSetId(newSetId);

    dispatch(addExercise({
      ...exerciseSkelton,
      _id: newExerciseId,
      name: exerciseData.abdominals[0].name,
      muscleGroups: [exerciseData.abdominals[0]['muscle group']]
    }));

    dispatch(addSet({
      ...setSkelton,
      _id: newSetId,
      exerciseId: newExerciseId,
    }));
  };

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
          <TableCell/>
        </TableRow>
        <TableCell/>
        {currentExercises && Object.values(currentExercises).map((exercise, i) => (
        <ExerciseRow
          exercise={exercise}
          key={i + "" + exercise._id}
        />
      ))}
    </>
  )
}

export default ExerciseRows