import React, { useState, useEffect } from 'react'
import ExerciseDropdown from './ExerciseDropdown';

import { useAppDispatch, useAppSelector } from "../redux/hooks";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { IExercise, deleteExercise } from '../redux/slices/exerciseSlice';
import { IRoutine } from '../redux/slices/routineSlice';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ClearIcon from "@mui/icons-material/Clear";
import SetRows from './SetRows';
import { editCurrentRoutine } from '../redux/slices/currentRoutineSlice';

// represent a Exercise containing info such as 
// exercise, total reps, sets and etc

const ExerciseRow: React.FC<{ exercise: IExercise }> = ({ exercise }) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteExercise(exercise._id));
  };

  return (
    <Box sx={{ margin: 1 }}>
      <Table size="small" aria-label="purchases">
        <TableBody>
          <TableRow>
            <TableCell >
              <TableCell>{exercise.name}</TableCell>
                <Box alignItems="center" display="flex">
                  <ExerciseDropdown
                  exercise={exercise}
                />
                <Box>
                <IconButton color="secondary" onClick={handleDelete}>
                  <ClearIcon />
                </IconButton>
              </Box>
              </Box>
            </TableCell>
            
          </TableRow>
          <TableRow>
            <TableCell >
              {(exercise) && <SetRows exercise={exercise} />}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default ExerciseRow;