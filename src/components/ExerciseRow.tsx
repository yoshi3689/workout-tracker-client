import React, { useState } from 'react'
import ExerciseDropdown from './ExerciseDropdown';
import SetRow from './SetRow';

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
import { IRoutine } from '../redux/slices/routineSlice';

// represent a Exercise containing info such as 
// exercise, total reps, sets and etc
const ExerciseRow: React.FC<{ exercise: IExercise, setRoutines: Function, routineId: string, routines: IRoutine[] }> = ({
  exercise, setRoutines, routineId, routines
}) => {
  // build a function that modifies a routine in the list.
  // specifically the Exercises of the routine by reflecting the state change
  // in Exercises list
  const [currentExercise, setCurrentExercise] = useState<IExercise>({
    ID: "",
    name: "",
    muscleGroups: [""],
    sets: {
      abc:{
        ID: "abc",
        rep: 0,
        rest: 0,
        weight: 0,
      },
    },
  });

  const handleAdd = () => {
    setCurrentExercise({
      ...currentExercise,
      sets: {
        ...currentExercise.sets, test: { ID: "test", rep: 0, rest: 0, weight: 0 }
      },
    });
  }
  return (
    <div className="row">
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
          scope="row"
        >
          This is going to be another row but with a collapsible nested table,
          and represents name of the exercise. In this table, we are trying to
          display name of exercise and the collapse button
          <Collapse in={true} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
              ></Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Sets</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      ExerciseRow
      <ExerciseDropdown
        routineId={routineId}
        exercise={currentExercise}
        setExercise={setCurrentExercise}
      />
      <h6>Sets:</h6>
      <div>
        {/* {currentExercise.sets && currentExercise.sets.} */}
        {Object.values(currentExercise.sets).map((set, i) => (
          <SetRow
            exercise={currentExercise}
            key={"" + i + routineId}
            set={set}
            setExercise={setCurrentExercise}
          />
        ))}
        <button onClick={handleAdd}>Add Set</button>
        <button>---Remove Exercise</button>
      </div>
    </div>
  );
};

export default ExerciseRow;