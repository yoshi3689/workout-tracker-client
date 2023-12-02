import React, { useState, useEffect } from "react";

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
import FormControl from "@mui/material/FormControl";
import TableFooter from "@mui/material/TableFooter";

import { addRoutine } from "../redux/slices/routineSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { newRoutineInitialState, editNewRoutine, clearNewRoutine } from "../redux/slices/newRoutineSlice";
import { useLocation } from "react-router-dom";
import ExerciseRows from "./ExerciseRows";

const RoutineCreate: React.FC = () => {
  const [workoutName, setWorkoutName] = useState("");

  const dispatch = useAppDispatch();
  const location = useLocation();

  const { accessToken, isLoggedIn } = useAppSelector(state => {
    return state.persistedReducer.user;
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setWorkoutName(e.target.value);
  }

  useEffect(() => {
    dispatch(editNewRoutine({
      ...newRoutineInitialState,
      name: workoutName
    }))
  }, [workoutName]);
  
  // set all the newRoutine states to the initial state
  // refelect the rest on the redux store
  const handleCancel = () => {
    setWorkoutName("");
    dispatch(clearNewRoutine());
  };

  // for now just add the new workout routine to an array
  // add a new workout routine to the list(probs API call to the DB)
  // reset the name
  const handleCreateAndEdit = () => {
    if (isLoggedIn && accessToken) {
      dispatch(addRoutine({
        ...newRoutineInitialState,
        name: workoutName,
        _id: accessToken,
        username: location.pathname.split("/")[2],
        createdAt: new Date().toISOString()
      }));
    }
    handleCancel();
  };

  return (
    <TableContainer component={Paper} style={{ maxWidth: "500px" }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell/>
            <TableCell>
              <Typography component="h5">Create/Edit Routine</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell/>
            
            <TableCell>
              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="routine_name">routine name</InputLabel>
                <Input
                  id="routine_name"
                  onChange={handleNameChange}
                />
              </FormControl>
            </TableCell>
            <TableCell/>
          </TableRow>
          <ExerciseRows isNew={true} />
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={handleCreateAndEdit}>Create+</button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default RoutineCreate;
