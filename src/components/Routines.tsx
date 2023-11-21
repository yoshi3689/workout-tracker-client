import React from 'react'
// import Routine from '../routes/Root'
import RoutineRow from './RoutineRow';

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
import { IRoutine } from '../redux/slices/routineSlice';

const testRoutineObjectArray: IRoutine[] = [
  {
  _id: "1",
  name: "1",
  createdAt: new Date(),
  isEditing: false,
  exercises: {
    11: {
    _id: "11",
    name: "11",
    muscleGroups: ["11"],
    sets: {
      111: {
        _id: "111",
        rep: 0,
        weight: 0,
        rest: 0,
      },
      112: {
        _id: "112",
        rep: 0,
        weight: 0,
        rest: 0,
      },
      },
    }
  }
  },
  {
  _id: "2",
  name: "2",
  createdAt: new Date(),
  isEditing: false,
  exercises: {
    22: {
    _id: "22",
    name: "22",
    muscleGroups: ["22"],
    sets: {
      212: {
        _id: "212",
        rep: 0,
        weight: 0,
        rest: 0,
      },
      222: {
        _id: "222",
        rep: 0,
        weight: 0,
        rest: 0,
      },
      },
    }
  }
  },
  
]

const Routines: React.FC<{ routines: IRoutine[], setRoutines: Function }> = ({ routines, setRoutines }) => {
  return (
    <TableContainer component={Paper} style={{ maxWidth: "500px" }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              <Typography component="h4">Routines</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {routines
            ? routines.map((routine) => (
                <RoutineRow
                  key={routine.name}
                  routine={routine}
                  setRoutines={setRoutines}
                  routines={routines}
                  isNew={false}
                ></RoutineRow>
              ))
            : testRoutineObjectArray.map((routine) => (
                <RoutineRow
                  key={routine.name}
                  routine={routine}
                  setRoutines={setRoutines}
                  routines={routines}
                  isNew={false}
                />
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Routines