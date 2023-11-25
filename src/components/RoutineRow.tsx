import React, { useEffect, useState } from 'react'
// import ExerciseDropdown from './ExerciseDropdown';
import ExerciseRow from './ExerciseRow';
import { IRoutine } from '../redux/slices/routineSlice';

import { useAppDispatch, useAppSelector } from "../redux/hooks";

import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IExercise } from '../redux/slices/exerciseSlice';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { editCurrentRoutine } from '../redux/slices/currentRoutineSlice';

// represent a whole workout routine
const RoutineRow: React.FC<{ routine: IRoutine, isNew: boolean }> = ({ routine, isNew }) => {
  const currentExercises = useAppSelector(state => state.persistedReducer.currentRoutine.exercises);
  const [open, setOpen] = useState(false);
  const [counter, setCounter] = useState(1);
  const [exercises, setExercises] = useState<IExercise[]>(currentExercises);


  const dispatch = useAppDispatch();


  // add a new exercise tuple
  const handleAdd = () => {
    const newExercise:IExercise = { _id: exercises.length+1+"", name: "", sets: [], muscleGroups: [""] };
    setExercises([
      ...exercises,
      newExercise,
    ]);
  };

  useEffect(() => {
    // assigning a new exercise to the record of exercises
    let tempExercises: IExercise[] = exercises;
    console.log(tempExercises);
    dispatch(editCurrentRoutine({
      ...routine,
      exercises: [...tempExercises]
    }));
  }, [exercises]);

  return (
    <React.Fragment>
      {!isNew && (
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell width="30%">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>

          <TableCell align="left" component="th" scope="row">
            {routine.name}
          </TableCell>
        </TableRow>
      )}
      {isNew && (
        <TableRow>
          <TableCell></TableCell>
          <TableCell>Exercises</TableCell>
          <TableCell></TableCell>
          <TableCell>
            <IconButton color="primary" onClick={handleAdd}>
              <AddCircleIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      )}

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          {!isNew ? (
            <Collapse in={open} timeout="auto" unmountOnExit>
              {exercises.map((exercise, i) => (
                <ExerciseRow
                  exercise={exercise}
                  routineId={routine._id}
                  key={i + "" + routine._id}
                />
              ))}
            </Collapse>
          ) : (
            <>
              {currentExercises.map((exercise, i) => (
                <ExerciseRow
                  exercise={exercise}
                  routineId={routine._id}
                  key={i + "" + routine._id}
                />
              ))}
            </>
          )}
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default RoutineRow;