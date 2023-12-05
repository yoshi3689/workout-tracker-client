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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { IExercise, deleteExercise } from '../redux/slices/exerciseSlice';
import ClearIcon from "@mui/icons-material/Clear";
import SetRows from './SetRows';
import { Collapse } from '@mui/material';

// represent a Exercise containing info such as 
// exercise, total reps, sets and etc

const ExerciseRow: React.FC<{ exercise: IExercise, isNew: boolean }> = ({ exercise, isNew }) => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = React.useState(true);
  
  const handleDelete = () => {
    dispatch(deleteExercise(exercise._id));
  };

  return (
    <>
    <TableRow>
      <TableCell >
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => setOpen(!open)}
        >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>
        
      <ExerciseDropdown exercise={exercise}/>
        
      {isNew && <TableCell >
        <IconButton color="secondary" onClick={handleDelete}>
          <ClearIcon />
        </IconButton>
      </TableCell>}
        
    </TableRow>
      
      <TableRow>
        <TableCell colSpan={4} sx={{padding:0}}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ paddingBottom: 0, borderBottom: 0 }} >

              {(exercise) && <SetRows exercise={exercise} isNew={isNew} />}
              
            </Box>
          </Collapse>
        </TableCell>  
    </TableRow>
    </>
  );
};

export default ExerciseRow;