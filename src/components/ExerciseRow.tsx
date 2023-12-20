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
import { Collapse, FormControl, Input } from '@mui/material';
import SetRow from './SetRow';
import { isMobile } from 'react-device-detect';
import ReadOnlySetRows from './ReadOnlySetRows';
import '../styles/tableCell.css';
import { Dot } from './Routines';
import { assignMuscleGroup } from '../utils/filterByBodyPart';

const iconCell = "iconCell";

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
      <TableRow onClick={() => setOpen(!open)} sx={{ "& > *": { borderBottom: "unset" }, position: "relative", cursor: "pointer" }} selected={open}>
        <TableCell align='left'>
          {/* <Box display={"flex"} alignItems="center" > */}
          <Box display={"flex"} alignItems="center" >
          <IconButton size='small' onClick={() => setOpen(!open)} >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        {isNew
          ? (<Box><ExerciseDropdown exercise={exercise} /></Box>
            ) : (
                <Box display={"flex"} alignItems="center">
                  <Typography>{exercise.name}</Typography>
                  <Box sx={{ marginLeft: "16px"}} >{exercise.muscleGroups.map(mg => Dot(assignMuscleGroup(mg), exercise.name))}</Box>
                </Box>
          )
            }
            </Box>
        </TableCell>
        <TableCell align='right' className={iconCell}>
        {isNew &&
          <IconButton size='small' color="error" onClick={handleDelete}>
            <ClearIcon />
          </IconButton>
          }
        
      </TableCell>
  </TableRow>
    <TableRow>
      <TableCell colSpan={2} sx={{ padding: 0 }}>
        <Collapse in={open} timeout="auto" unmountOnExit>
      {isNew ? (
        <Box sx={{ paddingBottom: 0, borderBottom: 0 }} >
          {(exercise) && <SetRows exercise={exercise} isNew={isNew} />}
        </Box>
        ) : (<ReadOnlySetRows sets={exercise.sets} /> )}
        </Collapse>
      </TableCell>  
    </TableRow>
    </>
  );
};

export default ExerciseRow;