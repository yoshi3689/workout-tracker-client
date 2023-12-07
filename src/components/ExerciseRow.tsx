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
      <TableCell width={"20%"} >
        {isNew &&
        <IconButton color="error" onClick={handleDelete}>
          <ClearIcon />
        </IconButton>}
        <IconButton
          onClick={() => setOpen(!open)}
        >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          
      </TableCell>
        
        {isNew
          ? (
            <ExerciseDropdown exercise={exercise}/>  
          ) :
          (
            <TableCell >
              {exercise.name}
            </TableCell>
          )
      }
    </TableRow>
      <TableRow>
      <TableCell colSpan={2} sx={{padding:0}}>
      {isNew ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ paddingBottom: 0, borderBottom: 0 }} >
            {(exercise) && <SetRows exercise={exercise} isNew={isNew} />}
          </Box>
        </Collapse>
      
          ) : (
              <Collapse in={open} timeout="auto" unmountOnExit>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                #        
              </TableCell>
              <TableCell>
                weight
              </TableCell>
              <TableCell>
                rep
              </TableCell>
              <TableCell>
                rest
              </TableCell>
            </TableRow>      
          </TableHead>
                <TableBody>
                  {/* set={set}
                index={i}
                exerciseId={exercise._id}
                isNew={isNew} */}
            {exercise.sets.map((set,i) => (
              <TableRow key={set._id}>
                <TableCell>
                  {i+1}
                </TableCell>
              <TableCell>
                {set.weight}
              </TableCell>
              <TableCell>
                {set.rep}
              </TableCell>
              <TableCell>
                {set.rest}
              </TableCell>
              </TableRow>  
            ))}    
          </TableBody>
                </Table>  
                </Collapse>
      )}
      </TableCell>  
    </TableRow>
    </>
  );
};

export default ExerciseRow;