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
import ClearIcon from "@mui/icons-material/Clear";
import SetRows from './SetRows';

// represent a Exercise containing info such as 
// exercise, total reps, sets and etc

const ExerciseRow: React.FC<{ exercise: IExercise }> = ({ exercise }) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteExercise(exercise._id));
  };

  return (
    // <Box sx={{ margin: 1 }}>
      
    // </Box>
    <Table style={{"paddingTop":"16px"}} >
      <TableBody>
        <TableRow>
          <ExerciseDropdown exercise={exercise} />
          <Box component={"td"} >
            <IconButton color="secondary" onClick={handleDelete}>
              <ClearIcon />
            </IconButton>
          </Box>
        </TableRow>
        <TableRow>
            <TableCell >
              {(exercise) && <SetRows exerciseId={exercise._id} />}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
  );
};

export default ExerciseRow;