import React from 'react'

import { useAppSelector } from "../../redux/hooks";

import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import AddIcon from '@mui/icons-material/Add';
import TableHead from '@mui/material/TableHead';

import '../../styles/tableCell.css';
import { useAddExercise } from '../../hooks/exercise/useAddExercise';
import ExerciseDelete from './ExerciseDelete';

const ExerciseAdd: React.FC = () => {
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
      {Object.values(exercises).length !== 0 &&
        <TableBody>
          {Object.values(exercises).map((exercise, i) => (
            <ExerciseDelete
              exercise={exercise}
              key={i + "" + exercise._id}
            />
          ))}
        </TableBody>}
      </Table>
  )
}

export default ExerciseAdd