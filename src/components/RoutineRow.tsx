import React, { useEffect, useState } from 'react'
// import ExerciseDropdown from './ExerciseDropdown';
import ExerciseRow from './ExerciseRow';
import { IRoutine } from '../redux/slices/routineSlice';

import { useAppDispatch, useAppSelector } from "../redux/hooks";

import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IExercise } from '../redux/slices/exerciseSlice';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { editCurrentRoutine } from '../redux/slices/currentRoutineSlice';

// represent a whole workout routine with exercises in it
const RoutineRow: React.FC<{ routine: IRoutine, isNew: boolean }> = ({ routine, isNew }) => {
  const currentExercises = useAppSelector(state => state.persistedReducer.currentRoutine.exercises);
  const [open, setOpen] = useState(false);
  const [counter, setCounter] = useState(1);

  // since the exercises brought down from the parent are set as ONLY initial
  // they do not get updated whenever the redux state has changed

  const [exercises, setExercises] = useState<IExercise[]>(currentExercises);


  const dispatch = useAppDispatch();


  // add a new exercise tuple
  const handleAdd = () => {
    const newExercise:IExercise = { _id: "exercise"+counter+"", name: "", sets: [], muscleGroups: [""] };
    setExercises([
      ...currentExercises,
      newExercise,
    ]);
    setCounter(counter+1);
  };

  useEffect(() => {
    // assigning a new exercise to the record of exercises
    let tempExercises: IExercise[] = exercises;
    if (!isNew) console.log("past routine load")
    // console.log(tempExercises);
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
          <TableCell>
            <Box display="flex" alignItems="center">
              <Typography>Exercises</Typography>
            <IconButton color="primary" onClick={handleAdd}>
              <AddCircleIcon />
            </IconButton>
            </Box>
          </TableCell>
          <TableCell/>
          <TableCell/>
        </TableRow>
      )}

      <TableRow>
        <TableCell/>
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
              {routine.exercises.map((exercise, i) => (
                <ExerciseRow
                  exercise={exercise}
                  routineId={routine._id}
                  key={i + "" + routine._id}
                />
              ))}
            </>
          )}
        </TableCell>
        <TableCell/>
      </TableRow>
    </React.Fragment>
  );
};

export default RoutineRow;