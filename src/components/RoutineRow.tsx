import React, { useEffect, useState } from 'react'
// import ExerciseDropdown from './ExerciseDropdown';
import ExerciseRow from './ExerciseRow';
import { IRoutine } from '../redux/slices/routineSlice';

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IExercise } from '../redux/slices/exerciseSlice';

// represent a whole workout routine
const RoutineRow: React.FC<{ routine: IRoutine, setRoutines: Function, routines: IRoutine[]  }> = ({ routine, setRoutines, routines }) => {
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
    <div className="row">
      <TableRow>
        <TableCell scope="row">
          <Typography>{routine.name}</Typography>
        </TableCell>
        {/* <TableCell>{routine.customerId}</TableCell>
            <TableCell align="right">{routine.amount}</TableCell>
            <TableCell align="right">
              {Math.round(routine.amount * row.price * 100) / 100}
            </TableCell> */}
        <TableCell>
          {workouts.map((exercise, i) => (
            <ExerciseRow
              exercise={exercise}
              routineId={routine.ID}
              key={i + "" + routine.ID}
              setRoutines={setRoutines}
              routines={routines}
            />
          ))}
        </TableCell>
      </TableRow>
      <h4></h4>
      <div>
        <h5>List of exercises</h5>
        <div></div>
      </div>
      <div>
        <button onClick={handleAdd}>Add Exercise +</button>
      </div>
    </div>
  );
};

export default RoutineRow