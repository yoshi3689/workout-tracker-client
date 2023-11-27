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
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TableFooter from "@mui/material/TableFooter";

import RoutineRow from "./RoutineRow";
import { IRoutine, addRoutine } from "../redux/slices/routineSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { editCurrentRoutine } from "../redux/slices/currentRoutineSlice";
import { useLocation } from "react-router-dom";

let routineSkelton:IRoutine = {
  _id: "1",
  username: "",
  name: "",
  isEditing: true,
  createdAt: new Date().toISOString(),
  exercises: []
};

// const routine:IRoutine = {
//   _id: "1",
//   name: "1",
//   isEditing: false,
//   createdAt: new Date().toISOString(),
//   exercises: []
// };

const RoutineCreate: React.FC<{ accessToken: string }> = ({ accessToken }) => {
  const [workoutName, setWorkoutName] = useState("");

  const dispatch = useAppDispatch();
  const location = useLocation();
  const routine = useAppSelector(state => {
    return state.persistedReducer.currentRoutine;
  });
  
  // set all the currentRoutine states to the initial state
  // refelect the rest on the redux store
  const handleCancel = () => {
    setWorkoutName("");
    dispatch(editCurrentRoutine({...routineSkelton}));
  };

  // for now just add the new workout routine to an array
  // add a new workout routine to the list(probs API call to the DB)
  // reset the name
  const handleCreate = () => {
    dispatch(
      addRoutine({ ...routineSkelton, name: workoutName, _id: accessToken, username: location.pathname.split("/")[2]  })
    );
    handleCancel();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setWorkoutName(e.target.value);
  }

  // will be fired basically when the name changes
  // useEffect(() => {
  //   dispatch(editCurrentRoutine({ ...routine, name: workoutName }));
  // },[dispatch, routine, workoutName])

  return (
    <TableContainer component={Paper} style={{ maxWidth: "500px" }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell/>
            <TableCell>
              <Typography component="h5">Routine</Typography>
            </TableCell>
            <TableCell/>
            <TableCell/>
            <TableCell/>
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
            <TableCell/>
            <TableCell/>
            
          </TableRow>
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
