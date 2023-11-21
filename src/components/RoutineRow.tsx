import React, { useEffect, useState } from 'react'
// import ExerciseDropdown from './ExerciseDropdown';
import ExerciseRow from './ExerciseRow';
import { IRoutine } from '../redux/slices/routineSlice';

import { useAppDispatch } from "../redux/hooks";

import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IExercise, addExercise } from '../redux/slices/exerciseSlice';
import AddCircleIcon from '@mui/icons-material/AddCircle';

// represent a whole workout routine
const RoutineRow: React.FC<{ routine:IRoutine, isNew: boolean  }> = ({ routine, isNew }) => {

  const [open, setOpen] = React.useState(false);
  const [workouts, setWorkouts] = useState<IExercise[]>([
    { _id:"exerciseTest", name: "", sets: {}, muscleGroups: [""] },
  ]);
  useEffect(() => {
    console.log(workouts);
  }, [workouts]);

  const dispatch = useAppDispatch();


  // add a new exercise
  const handleAdd = () => {
    const newExercise:IExercise = { _id: "exerciseTest", name: "", sets: {}, muscleGroups: [""] };
    setWorkouts([
      ...workouts,
      newExercise,
    ]);
    dispatch(addExercise(newExercise));
  };

  return (
    <React.Fragment>
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
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          {!isNew ? (
            <Collapse in={open} timeout="auto" unmountOnExit>
              {workouts.map((exercise, i) => (
                <ExerciseRow
                  exercise={exercise}
                  routineId={routine._id}
                  key={i + "" + routine._id}
                />
              ))}
            </Collapse>
          ) : (
            <>
              {workouts.map((exercise, i) => (
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
      <TableRow>
        <TableCell>
          <IconButton color="primary" onClick={handleAdd}>
            <AddCircleIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default RoutineRow;