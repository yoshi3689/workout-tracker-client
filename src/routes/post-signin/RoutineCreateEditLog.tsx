import React, { useState, useEffect } from "react";

import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import { addRoutine, modifyRoutine } from "../../redux/slices/routineSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { newRoutineInitialState, editNewRoutine, clearNewRoutine } from "../../redux/slices/newRoutineSlice";
import { useLocation } from "react-router-dom";
import ExerciseRows from "../../components/ExerciseRows";
import { Box, Button, Container } from "@mui/material";
import { clearExercises } from "../../redux/slices/exerciseSlice";
import { clearSets } from "../../redux/slices/setsSlice";
import useAuth from "../../hooks/useAuth";
import { selectAccessToken, selectIsLoggedIn } from "../../redux/slices/authSlice";

const CreateOrEdit: React.FC = () => {
  const dispatch = useAppDispatch();
  const routine = useAppSelector(state => state.persistedReducer.newRoutine);
  const { username } = useAuth();

  const accessToken = useAppSelector(selectAccessToken);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const [workoutName, setWorkoutName] = useState(routine.name ? routine.name : "");

  // const handleNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   setWorkoutName(e.target.value);
  // }

  useEffect(() => {
    dispatch(editNewRoutine({
      ...routine,
      name: workoutName
    }));
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
        dispatch(modifyRoutine(username));
      } 
      else {
        dispatch(addRoutine(username));
      }
    }
    handleCancel();
  };


  return (
      <Container component={Paper} sx={{paddingBlock: "24px", marginBottom: "100px"}}>
      <Box>
        <Typography gutterBottom variant="h5">Log Workout</Typography>
      </Box>
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

export default CreateOrEdit;
