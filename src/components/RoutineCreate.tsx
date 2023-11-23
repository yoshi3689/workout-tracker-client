import React, { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TableFooter from "@mui/material/TableFooter";

import RoutineRow from "./RoutineRow";
import { IRoutine, addRoutine } from "../redux/slices/routineSlice";
import { useAppDispatch } from "../redux/hooks";

let a:IRoutine = {
  _id: "",
  name: "",
  isEditing: true,
  createdAt: new Date().toISOString(),
  exercises: {}
  // exercises: {
  //   11: {
  //     _id: "11",
  //     name: "11",
  //     muscleGroups: ["11"],
  //     sets: {
  //       111: {
  //         _id: "111",
  //         rep: 0,
  //         weight: 0,
  //         rest: 0,
  //       },
  //       112: {
  //         _id: "112",
  //         rep: 0,
  //         weight: 0,
  //         rest: 0,
  //       },
  //     },
  //   }
  // }
};

const RoutineCreate: React.FC<{ routine: IRoutine, accessToken: string }> = ({ routine, accessToken }) => {
  const [workoutName, setWorkoutName] = useState("");

  const dispatch = useAppDispatch();
  
  // set all the editing states to the initial state
  const handleCancel = () => {
    setWorkoutName("");
  };

  // for now just add the new workout routine to an array
  // add a new workout routine to the list(probs API call to the DB)
  // reset the name
  const handleCreate = () => {
    dispatch(addRoutine({ ...a, name: workoutName, _id: accessToken }))
    handleCancel();
  };
  return (
    <TableContainer component={Paper} style={{ maxWidth: "500px" }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>

            <TableCell>
              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="routine_name">routine name</InputLabel>
                <Input
                  id="routine_name"
                  onChange={(e) => setWorkoutName(e.target.value)}
                />
              </FormControl>
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <RoutineRow key={routine.name} routine={routine} isNew={true} />
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
              <div>
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleCreate}>Create+</button>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default RoutineCreate;
