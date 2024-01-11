import React from 'react'
import { useDeleteExercise } from '../../hooks/exercise/useDeleteExercise';
import { IExercise } from '../../redux/slices/exerciseSlice';
import ExerciseRow from './ExerciseRow';
import { Box, IconButton } from '@mui/material';
import { ClearIcon } from '@mui/x-date-pickers';
import ExerciseDropdown from './ExerciseDropdown';
import SetAdd from '../Set/SetAdd';

const ExerciseDelete: React.FC<{exercise: IExercise}> = ({ exercise }) => {
  const [handleDelete] = useDeleteExercise(exercise._id);
  return (
    <ExerciseRow
      rowContent={<ExerciseDropdown exercise={exercise} />}
      rowAction={
        <IconButton size='small' color="error" onClick={handleDelete}>
          <ClearIcon />
        </IconButton>
      }
      collapsibleContent={<Box sx={{ paddingBottom: 0, borderBottom: 0 }}>
        {(exercise) && <SetAdd exercise={exercise} />}
      </Box>}
      exercise={exercise} />
  )
}

export default ExerciseDelete