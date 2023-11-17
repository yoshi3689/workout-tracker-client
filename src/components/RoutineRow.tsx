import React, { useEffect, useState } from 'react'
// import ExerciseDropdown from './ExerciseDropdown';
import ExerciseRow from './ExerciseRow';
import { IRoutine } from '../redux/slices/routineSlice';

import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IExercise } from '../redux/slices/exerciseSlice';
import AddCircleIcon from '@mui/icons-material/AddCircle';

// represent a whole workout routine
const RoutineRow: React.FC<{ routine: IRoutine, setRoutines: Function, routines: IRoutine[] }> = ({ routine, setRoutines, routines }) => {
        /* <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell> */
  const [open, setOpen] = React.useState(false);
  const [workouts, setWorkouts] = useState<IExercise[]>([
    { ID:"exerciseTest", name: "", sets: {}, muscleGroups: [""] },
  ]);
  useEffect(() => {
    console.log(workouts);
  }, [workouts]);


  // add a new workout
  const handleAdd = () => {
    setWorkouts([
      ...workouts,
      { ID: "exerciseTest", name: "", sets: {}, muscleGroups: [""] },
    ]);
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
          <Collapse in={open} timeout="auto" unmountOnExit>
            {workouts.map((exercise, i) => (
              <ExerciseRow
                exercise={exercise}
                routineId={routine.ID}
                key={i + "" + routine.ID}
                setRoutines={setRoutines}
                routines={routines}
              />
            ))}
          </Collapse>
        </TableCell>
      </TableRow>
      <TableRow>
        <IconButton color="primary">
          <AddCircleIcon />
        </IconButton>
      </TableRow>
    </React.Fragment>
  );
};

export default RoutineRow

{/* <TableCell>
          {workouts.map((exercise, i) => (
            <ExerciseRow
              exercise={exercise}
              routineId={routine.ID}
              key={i + "" + routine.ID}
              setRoutines={setRoutines}
              routines={routines}
            />
          ))}
        </TableCell> */}