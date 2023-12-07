import React from 'react'

import ExerciseRow from './ExerciseRow';

import { useAppDispatch, useAppSelector } from "../redux/hooks";

import exerciseData from "../data/exercises.json"

import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TableHead from '@mui/material/TableHead';

import { IExercise, addExercise, exerciseSkelton } from '../redux/slices/exerciseSlice';
import { setSkelton, addSet } from '../redux/slices/setsSlice';



const ExerciseRows: React.FC<{ isNew: boolean }> = ({ isNew }) => {
  const exercises = useAppSelector(state => state.persistedReducer.exercises);
  const dispatch = useAppDispatch();

  // add a new exercise and a set
  const handleAdd = () => {

    const exercisesAdded: {payload: IExercise, type: string} = dispatch(addExercise({
      ...exerciseSkelton,
      name: exerciseData.abdominals[0].name,
      muscleGroups: [exerciseData.abdominals[0]['muscle group']],
    }));

    dispatch(addSet({
      set: {
        ...setSkelton
      },
      exerciseId: exercisesAdded.payload._id
    }));
  }; 

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell width="25%" >
            <IconButton color="primary" onClick={handleAdd}>
              <AddCircleIcon />
            </IconButton>  
          </TableCell>
          <TableCell align='left' >
            <Typography variant='h6' sx={{paddingLeft:0}} >Exercises</Typography>      
          </TableCell>
          
        </TableRow> 
      </TableHead>
      {(isNew && Object.values(exercises).length !== 0) &&
        <TableBody>
          {Object.values(exercises).map((exercise, i) => (
            <ExerciseRow
              isNew={isNew}
              exercise={exercise}
              key={i + "" + exercise._id}
            />
          ))}
        </TableBody>
      }
      </Table>
  )
}

export default ExerciseRows