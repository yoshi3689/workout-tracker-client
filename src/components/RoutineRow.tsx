import React, { useState } from 'react'

import ExerciseRow from './ExerciseRow';
import { IRoutine } from '../redux/slices/routineSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Edit } from '@mui/icons-material';
import { Box, Table, TableBody, TableHead, Typography } from '@mui/material';
import { editNewRoutine } from '../redux/slices/newRoutineSlice';
import { IExercise, loadExercises } from '../redux/slices/exerciseSlice';
import { ISet, loadSets } from '../redux/slices/setsSlice';

// represent a whole workout routine with exercises in it
const RoutineRow: React.FC<{ routine: IRoutine, isNew: boolean }> = ({ routine, isNew }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  
  const routineInForm = useAppSelector(state => state.persistedReducer.newRoutine);
  
  const onEditClick = () => {
    dispatch(editNewRoutine({...routine, isEditing: true, exercises: []}));
    let exercises: Record<string, IExercise> = {};
    routine.exercises.forEach(e => {
      exercises[e._id] = {...e, sets: []}
    });
    dispatch(loadExercises(exercises))
    const sets: Record<string, Record<string, ISet>> = {};
      routine.exercises.forEach(e => {
        sets[e._id] = {};
        e.sets.forEach(s => {
            sets[e._id][s._id] = s
          })
    });
    dispatch(loadSets(sets))
  }
  // console.log(isEditing, routineInForm)
  const rowContent = <>
    <TableCell sx={{display:"flex"}} >
          <IconButton size="small" onClick={onEditClick}>
            <Edit />
          </IconButton>
          <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
          <TableCell >
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography>{routine.name}</Typography>
            <Typography>{routine.createdAt.split("T")[0].replaceAll("-", "/")}</Typography>
            </Box>
          </TableCell>
  </>
  return (
    <React.Fragment>
      {(routineInForm.isEditing && routine._id === routineInForm._id) ? (
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }} selected>
          {rowContent}
        </TableRow>
      ) : (
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }} >
          {rowContent}
        </TableRow>
      )
    }
      <TableRow>
        <TableCell style={{ padding: 0}} colSpan={2}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table>
              <TableBody>
                {!isNew && routine.exercises.map((exercise, i) => (
              <ExerciseRow
                exercise={exercise}
                key={i + exercise._id}
                isNew={isNew}
              />
            ))} 
              </TableBody>
            </Table>   
          </Collapse>
        </TableCell>
        
      </TableRow>
    </React.Fragment>
  );
};

export default RoutineRow;