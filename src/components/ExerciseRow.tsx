import React, { useState, useEffect } from 'react'
import ExerciseDropdown from './ExerciseDropdown';

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { IExercise } from '../redux/slices/exerciseSlice';
import ClearIcon from "@mui/icons-material/Clear";
import SetRows from './SetRows';
import { Collapse } from '@mui/material';
import { isMobile } from 'react-device-detect';
import ReadOnlySetRows from './ReadOnlySetRows';
import '../styles/tableCell.css';
import { Dot } from './Routines';
import { assignMuscleGroup } from '../utils/filterByBodyPart';
import { useDeleteExercise } from '../hooks/useDeleteExercise';

const iconCell = "iconCell";

// represent a Exercise containing info such as 
// exercise, total reps, sets and etc
const ExerciseRow: React.FC<{ exercise: IExercise, isNew: boolean }> = ({ exercise, isNew }) => {
  const [open, setOpen] = React.useState(true);
  const [handleDelete] = useDeleteExercise(exercise._id)
  return (
    <>
      <TableRow onClick={() => setOpen(!open)} sx={{ "& > *": { borderBottom: "unset" }, position: "relative", cursor: "pointer" }} selected={open}>
        <TableCell align='left'>
          <Box display={"flex"} alignItems="center" >
          <IconButton size='small' onClick={() => setOpen(!open)} >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
            {isNew
              ? (
                <ExerciseDropdown exercise={exercise} />    
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
          {isNew ?
            (
              <Box sx={{ paddingBottom: 0, borderBottom: 0 }} >
                {(exercise) && <SetRows exercise={exercise} isNew={isNew} />}
              </Box>
            ) : (
              <ReadOnlySetRows sets={exercise.sets} />
            )
          }
        </Collapse>
      </TableCell>  
    </TableRow>
    </>
  );
};

export default ExerciseRow;