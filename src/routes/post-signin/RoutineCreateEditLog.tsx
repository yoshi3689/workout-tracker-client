import React, { useState, useEffect } from "react";

import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Typography from "@mui/material/Typography";

import { IRoutine, addRoutine, getRoutines, modifyRoutine } from "../../redux/slices/routineSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { editNewRoutine, clearNewRoutine } from "../../redux/slices/newRoutineSlice";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container } from "@mui/material";
import { clearExercises } from "../../redux/slices/exerciseSlice";
import { clearSets } from "../../redux/slices/setsSlice";
import useAuth from "../../hooks/useAuth";
import { checkSigninStatus, selectAccessToken, selectIsLoggedIn } from "../../redux/slices/authSlice";
import { PATHNAMES, defineUserPath } from "../../utils/pathnames";
import Modal from '@mui/material/Modal';
import Routines from "../../components/Routine/Routines";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { modifyRoutineState } from "../../redux/slices/routineStateSlice";
import ExerciseAdd from "../../components/Exercise/ExerciseAdd";

const CreateOrEdit: React.FC = () => {
  const dispatch = useAppDispatch();

  const routine = useAppSelector(state => state.persistedReducer.newRoutine);
  const routines = useAppSelector(state => state.persistedReducer.routines);
  const { username } = useAuth();
  const naviagte = useNavigate();
  const accessToken = useAppSelector(selectAccessToken);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  
  const goToUserHome = () => {
    naviagte(defineUserPath(username, PATHNAMES.USER_HOME));
  }
  // set all the newRoutine states to the initial state
  // refelect the rest on the redux store
  const handleCancel = () => {
    dispatch(clearNewRoutine());
    dispatch(clearExercises())
    dispatch(clearSets())
    goToUserHome();
  };

  const unsetCredentials = () => {
    dispatch(checkSigninStatus({
      isLoggedIn: false,
      accessToken: ''
    }));
  }

  // for now just add the new workout routine to an array
  // add a new workout routine to the list(probs API call to the DB)
  // reset the name
  const handleCreateAndModify = async() => {
    try {
      if (isLoggedIn && accessToken) {
        const isIdEmpty: boolean = routine._id === "";
        console.log(isIdEmpty)
        await dispatch(isIdEmpty ? addRoutine(username) : modifyRoutine(username));
        dispatch(modifyRoutineState({
            date: new Date().toDateString(),
            created: isIdEmpty,
            modified: !isIdEmpty
          }));
        handleCancel();
        goToUserHome();
      }
    } catch (err) {
        setError(getErrorMessage(err));
        unsetCredentials();
    }
  };


  const fetchRoutines = async () => {
    try {
      await dispatch(getRoutines({accessToken: accessToken, username })).unwrap();
    } catch (err) {
      setError(getErrorMessage(err));
      unsetCredentials();
    }
  }

  const handleOpenRoutinesModal = async () => {
    if (routines.length < 1) {
      await fetchRoutines();
    }
    setIsModalOpen(true);
  }

  const handleCloseRoutinesModal = () => {
    setIsModalOpen(false);
  }

  const RoutineSelectModal = (
    <Modal
      component={Container}
      open={isModalOpen}
      onClose={handleCloseRoutinesModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: "85%",
          height: "70%",
          overflow: "hidden", 
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
        <Routines
          titleTextElement={<Typography variant="h6">Select Routine</Typography>}
          onSelectCallBack={handleCloseRoutinesModal}
        />
        </Box>
      </Modal>
  )

  return (
      <Container component={Paper} sx={{paddingBlock: "24px", marginBottom: "100px"}}>
      <Box display={"flex"}>
        <Typography gutterBottom variant="h5">Log Workout</Typography>
        
      </Box>
      <Box sx={{ paddingBottom: "24px" }}>
        {routine.isEditing && routine._id
          ? <Typography>Editing {routine.createdAt}</Typography>
          : <>
            <Typography>Creating new routine</Typography>
            <Button onClick={handleOpenRoutinesModal}>Use Previous Log to Start</Button>
          </>
        }
      </Box>
      <TableContainer component={Paper} >
        <ExerciseAdd />
      </TableContainer>
      <Box paddingTop={"24px"} display={"flex"} justifyContent={"end"} >
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateAndModify}
          style={{ "marginRight": "8px" }}>
          Save
        </Button>
        {!routine._id &&
          <Button
            color="inherit"
            onClick={handleCancel}>RESET
          </Button>
         }
      </Box>
      {RoutineSelectModal}
    </Container>
  );
};

export default CreateOrEdit;
