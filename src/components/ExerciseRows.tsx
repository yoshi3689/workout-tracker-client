import React from 'react'

import ExerciseRow from './ExerciseRow';

import { useAppSelector } from "../redux/hooks";

import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import AddIcon from '@mui/icons-material/Add';
import TableHead from '@mui/material/TableHead';

import '../styles/tableCell.css';
import { useAddExercise } from '../hooks/exercise/useAddExercise';

const ExerciseRows: React.FC<{ isNew: boolean }> = ({ isNew }) => {
  const exercises = useAppSelector(state => state.persistedReducer.exercises);
  const [handleAdd] = useAddExercise();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell >
            <Typography variant='h6'>Exercises</Typography>      
          </TableCell>
          <TableCell align='right' >
            <IconButton size='small' color="primary" onClick={handleAdd}>
              <AddIcon />
            </IconButton>  
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