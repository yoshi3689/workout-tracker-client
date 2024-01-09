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

import { changeRoutineTemplate, selectRoutineTemplate } from '../redux/slices/routineTemplateSlice';

const iconCell = "iconCell";
// represent a whole workout routine with exercises in it
const RoutineRow: React.FC<{ routine: IRoutine, isNew: boolean }>
  = ({ routine, isNew,  }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const routineId = useAppSelector(selectRoutineTemplate);
  
  const onEditClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
  }
    
  const handleRadioChangeVal = (event: React.ChangeEvent<HTMLInputElement>) => {
    const test = dispatch(changeRoutineTemplate(event.target.value));
    console.log(test)
  }

    const RightMostElement = (
      <Radio
        value={routine._id}
        checked={routineId === routine._id}
        onChange={handleRadioChangeVal}
        name="radio-buttons"
        inputProps={{ 'aria-label': `routine ${routine.createdAt}` }}
      />
    );
  
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