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
  // build a function that modifies a routine in the list.
  // specifically the Exercises of the routine by reflecting the state change
  // in Exercises list

  // 
  // const handleExerciseChange = () => {
    
  // }

  // add a new set to an exercise
  // const handleAdd = () => {
  //   setCurrentExercise({
  //     ...currentExercise,
  //     sets: {
  //       ...currentExercise.sets, test: { _id: "test", rep: 0, rest: 0, weight: 0 }
  //     },
  //   });
  // }
  return (
    <Box sx={{ margin: 1 }}>
      <Table size="small" aria-label="purchases">
        {/* <TableHead>
          <TableRow>
            <TableCell component="th">
              <Typography component="h5">Exercises</Typography>
            </TableCell>
          </TableRow>
        </TableHead> */}
        <TableBody>
          <TableRow>
            <TableCell>
              <ExerciseDropdown
                exerciseId={exercise._id}
                currentExercise={exercise}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              {(exercise) && <SetRows exercise={exercise} />}
              {/* <IconButton color="primary" onClick={handleAdd}>
                <AddCircleIcon />
              </IconButton>
              <IconButton color="secondary" onClick={handleAdd}>
                <ClearIcon />
              </IconButton> */}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default ExerciseRow;