import React, { useEffect, useState } from 'react'

import ExerciseRow from '../Exercise/ExerciseRow';
import { IRoutine } from '../../redux/slices/routineSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Radio from '@mui/material/Radio';

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Edit } from '@mui/icons-material';
import { Box, Table, TableBody, TableHead, Typography } from '@mui/material';
import '../../styles/tableCell.css';
import { Dot } from './Routines';

import { changeRoutineTemplate, selectRoutineTemplate } from '../../redux/slices/routineTemplateSlice';
import ReadOnlySetRows from '../Set/ReadOnlySetRows';
import { assignMuscleGroup } from '../../utils/filterByBodyPart';

const iconCell = "iconCell";
// represent a whole workout routine with exercises in it
const RoutineRow: React.FC<{ routine: IRoutine }>
  = ({ routine }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const routineId = useAppSelector(selectRoutineTemplate);
  
    const handleRadioChangeVal = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeRoutineTemplate(event.target.value))
  }
    
  useEffect(() => {
    setOpen(routine._id === routineId)
  }, [routineId])

    const RightMostElement = (
      <Radio
        value={routine._id}
        checked={routineId === routine._id}
        onChange={handleRadioChangeVal}
        onClick={(e) => e.stopPropagation()}
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
      <TableRow onClick={()=>setOpen(!open)} sx={{  position: "relative", cursor:"pointer" }} selected={open}>
        {rowContent}
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0}} colSpan={2}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table>
              <TableBody>
                {routine.exercises.map((exercise, i) => (
                  <ExerciseRow
                    exercise={exercise}
                    key={i + exercise._id}
                    collapsibleContent={
                      <ReadOnlySetRows sets={exercise.sets} />
                    }
                    rowContent={
                      <Box display={"flex"} alignItems="center">
                        <Typography>{exercise.name}</Typography>
                        <Box sx={{ marginLeft: "16px" }} >
                          {exercise.muscleGroups.map(mg => Dot(assignMuscleGroup(mg), exercise.name))}
                        </Box>
                      </Box>
                    }
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