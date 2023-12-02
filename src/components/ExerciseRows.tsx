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
  const exercises = useAppSelector(state => state.persistedReducer.exercises);
  console.log(exercises)
  const dispatch = useAppDispatch();

  // add a new exercise and a set
  const handleAdd = () => {

    const exercisesAdded: {payload: IExercise, type: string} = dispatch(addExercise({
      ...exerciseSkelton,
      name: exerciseData.abdominals[0].name,
      muscleGroups: [exerciseData.abdominals[0]['muscle group']],
    }));

    dispatch(addSet({
      set: {
        ...setSkelton
      },
      exerciseId: exercisesAdded.payload._id
    }));
  }; 

  return (
    <>
      <TableRow style={{"marginBottom":"16px"}} >
        <TableCell />
        <TableCell>
          <Typography>Exercises</Typography>    
        </TableCell>
        <TableCell>
          <IconButton color="primary" onClick={handleAdd}>
              <AddCircleIcon />
            </IconButton>
        </TableCell>
        <TableCell/>
      </TableRow>
      <TableRow>
        <TableCell />
        <TableCell>
              {exercises && Object.values(exercises).map((exercise, i) => (
        <ExerciseRow
          exercise={exercise}
          key={i + "" + exercise._id}
        />
      ))}
        </TableCell>
        
      </TableRow>
    </>
  )
}

export default ExerciseRows