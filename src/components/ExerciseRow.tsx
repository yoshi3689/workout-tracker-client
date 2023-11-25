import React, { useState } from 'react'
import ExerciseDropdown from './ExerciseDropdown';

import { useAppDispatch } from "../redux/hooks";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { IExercise } from '../redux/slices/exerciseSlice';
import { IRoutine } from '../redux/slices/routineSlice';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ClearIcon from "@mui/icons-material/Clear";
import SetRows from './SetRows';

// represent a Exercise containing info such as 
// exercise, total reps, sets and etc

const ExerciseRow: React.FC<{ exercise: IExercise, routineId: string }> = ({
  exercise, routineId,
}) => {
  return (
    <Box sx={{ margin: 1 }}>
      <Table size="small" aria-label="purchases">
        <TableBody>
          <TableRow>
            <TableCell >
                <Box alignItems="center" display="flex">
                  <ExerciseDropdown
                  exerciseId={exercise._id}
                  currentExercise={exercise}
                />
                <Box>
                <IconButton color="secondary">
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