import React, { ChangeEvent, MouseEventHandler, useState } from 'react'

import ExerciseRow from './ExerciseRow';
import { IRoutine } from '../redux/slices/routineSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Radio from '@mui/material/Radio';

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Edit } from '@mui/icons-material';
import { Box, Table, TableBody, TableHead, Typography } from '@mui/material';
import { editNewRoutine } from '../redux/slices/newRoutineSlice';
import { IExercise, loadExercises } from '../redux/slices/exerciseSlice';
import { ISet, loadSets } from '../redux/slices/setsSlice';
import '../styles/tableCell.css';
import { Dot } from './Routines';
import useAuth from '../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

const iconCell = "iconCell";
// represent a whole workout routine with exercises in it
const RoutineRow: React.FC<{ routine: IRoutine, isNew: boolean, isRadioButton: boolean, selectedValue: string, handleRadioChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void,}>
  = ({ routine, isNew, isRadioButton, selectedValue, handleRadioChange }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  
  const { username } = useAuth();
  const navigate = useNavigate();
  const navigateToLog = () => {
    navigate(`/dashboard/${username}/log`)
  }
  
    const onEditClick = (event: React.MouseEvent<HTMLElement>): void => {
      event.stopPropagation();
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
    navigateToLog();
  }

  

  const RightMostElement = isRadioButton
    ? (
      <Radio
        value={routine._id}
        checked={selectedValue === routine._id}
        onChange={handleRadioChange}
        name="radio-buttons"
        inputProps={{ 'aria-label': `routine ${routine.createdAt}` }}
      />
    )    
  : (
    <IconButton color='warning' title="Edit Routine" size="small" onClick={onEditClick}>
        <Edit />
      </IconButton>)
  
  const rowContent = <>
    <TableCell >
      <Box display={"flex"} alignItems="center" >
        <IconButton
          aria-label="expand row"
          onClick={() => setOpen(!open)}
        >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </IconButton>
        <Typography >{routine.createdAt.split("T")[0].replaceAll("-", "/")}</Typography>
        <Box sx={{ marginLeft: "16px"}} >{routine.muscleGroups.map(mg => Dot(mg, routine.createdAt))}</Box>
        {/* {RoutineRow.name && <Typography>{routine.name}</Typography>} */}
    </Box>
    </TableCell>
    <TableCell align='right' className={iconCell} sx={{marginBottom:"-0.5px"}}>
      {RightMostElement}
    </TableCell>
  </>
  return (
    <React.Fragment>
      <TableRow  sx={{  position: "relative", cursor:"pointer" }} selected={open}>
        {rowContent}
      </TableRow>
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