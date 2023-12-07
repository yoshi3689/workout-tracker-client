import React, { useState, useEffect } from "react";

import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import { addRoutine, modifyRoutine } from "../redux/slices/routineSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { newRoutineInitialState, editNewRoutine, clearNewRoutine } from "../redux/slices/newRoutineSlice";
import { useLocation } from "react-router-dom";
import ExerciseRows from "./ExerciseRows";
import { Box, Button, Container } from "@mui/material";
import { clearExercises } from "../redux/slices/exerciseSlice";
import { clearSets } from "../redux/slices/setsSlice";

const RoutineCreate: React.FC = () => {
  const dispatch = useAppDispatch();
  const routine = useAppSelector(state => state.persistedReducer.newRoutine);
  const location = useLocation();
  console.log(routine)
  const [workoutName, setWorkoutName] = useState(routine.name ? routine.name : "");

  const { accessToken, isLoggedIn } = useAppSelector(state => {
    return state.persistedReducer.user;
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setWorkoutName(e.target.value);
  }

  useEffect(() => {
    dispatch(editNewRoutine({
      ...routine,
      name: workoutName
    }))
  }, [workoutName]);
  
  // set all the newRoutine states to the initial state
  // refelect the rest on the redux store
  const handleCancel = () => {
    setWorkoutName("");
    dispatch(clearNewRoutine());
    dispatch(clearExercises())
    dispatch(clearSets())
  };

  // for now just add the new workout routine to an array
  // add a new workout routine to the list(probs API call to the DB)
  // reset the name
  const handleCreateAndModify = () => {
    if (isLoggedIn && accessToken) {
      if (routine._id) {
        console.log("trying to modify the routine", routine._id);
        dispatch(modifyRoutine(location.pathname.split("/")[2]));
      } else {
        console.log("trying to add the routine", routine._id);
        // dispatch(addRoutine(location.pathname.split("/")[2]));
      }
    }
    handleCancel();
  };


  return (
    <Container component={Paper} sx={{paddingBlock: "24px", marginBottom: "100px"}}>
      <Box>
        <Typography variant="h5">Create/Edit Routine</Typography>
      </Box>
      <FormControl sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="routine_name">routine name</InputLabel>
          <Input
            id="routine_name"
            value={routine.name}
            onChange={handleNameChange}
          />
        </FormControl>
      <Box sx={{paddingBottom: "24px"}}>
        
      </Box>
      <TableContainer component={Paper} >
        <ExerciseRows isNew={true} />
      </TableContainer>
      
      <Box paddingTop={"24px"} display={"flex"} justifyContent={"end"} >
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateAndModify}
          style={{"marginRight":"8px"}}>Create+
          
        </Button>
        <Button
          color="inherit"
          onClick={handleCancel}>RESET
        </Button>
        
      </Box>
    </Container>
    
  );
};

export default RoutineCreate;
