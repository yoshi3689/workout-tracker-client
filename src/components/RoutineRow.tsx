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

// represent a whole workout routine with exercises in it
const RoutineRow: React.FC<{ routine: IRoutine, isNew: boolean }> = ({ routine, isNew }) => {
  
  const [open, setOpen] = useState(false);
  

  return (
    <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell width="30%">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell align="left" component="th" scope="row">
            {routine.name}
          </TableCell>
        </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {routine.exercises.map((exercise, i) => (
              <ExerciseRow
                exercise={exercise}
                routineId={routine._id}
                key={i + "" + routine._id}
              />
            ))}    
          </Collapse>
        </TableCell>
        <TableCell/>
      </TableRow>
    </React.Fragment>
  );
};

export default RoutineRow;