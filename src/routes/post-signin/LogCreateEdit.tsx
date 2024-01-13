import React, { useState } from "react";

import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Typography from "@mui/material/Typography";
import { Box, Button, Container } from "@mui/material";
import Modal from '@mui/material/Modal';

import Routines from "../../components/Routine/Routines";
import ExerciseAdd from "../../components/Exercise/ExerciseAdd";
import { useFetchRoutines } from "../../hooks/routine/useFetchRoutines";
import { useCreateModifyRoutine } from "../../hooks/routine/useCreateModifyRoutine";
import { useClearRoutine } from "../../hooks/routine/useClearRoutine";
import useAuth from "../../hooks/useAuth";
import { useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { selectAccessToken } from "../../redux/slices/authSlice";
import { PATHNAMES, defineUserPath } from "../../utils/pathnames";
import Unauthorized from "../../components/Error/Unauthorized";
import ModalWindow from "../../components/Modal/ModalWindow";
import { formatDateString } from "../../utils/formatDateString";


const LogCreateEdit: React.FC = () => {
  const routine = useAppSelector(state => state.persistedReducer.newRoutine);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { username } = useAuth();
  const naviagte = useNavigate();
  const accessToken = useAppSelector(selectAccessToken);

  const handleClear = useClearRoutine();

  const { fetchError } = useFetchRoutines(accessToken, username);
  const { createModifyError, handleCreateAndModify } = useCreateModifyRoutine(); 

  const cleanupCreateModify = () => {
    handleCreateAndModify(routine._id === "", username);
    handleClear();
    naviagte(defineUserPath(username, PATHNAMES.USER_HOME));
  }

  const topText = (routine.isEditing && routine._id)
    ? ` editing ${formatDateString(routine.createdAt)}`
    : " logging a new routine"

  return ((!fetchError && !createModifyError)
    ? (
      <Box>
      <Typography gutterBottom variant="h5">Log Workout</Typography> 
      <Box display="flex" justifyContent="space-between" sx={{ paddingBottom: "24px" }}>
        
        <Button variant="outlined" onClick={() => setIsModalOpen(true)}>Use Previous Log</Button>    
        
        </Box>
        <Typography variant="overline">
          You are {topText}
        </Typography>
      <TableContainer component={Paper} >
        <ExerciseAdd />
      </TableContainer>
      <Box paddingTop={"24px"} display={"flex"} justifyContent={"end"} >
        <Button
          variant="contained"
          color="primary"
          onClick={cleanupCreateModify}
          style={{ "marginRight": "8px" }}>
          Save
        </Button>
        {!routine._id &&
          <Button
            color="inherit"
            onClick={handleClear}>RESET
          </Button>
         }
      </Box>
      <ModalWindow
        isOpen={isModalOpen}   
        handleClose={() => setIsModalOpen(false)}  
        children={
          <Routines
            titleTextElement={<Typography variant="h6">Select Routine</Typography>}
            onSelectCallBack={() => setIsModalOpen(false)}
        />}  
      />
    </Box>
    )
    : fetchError ? (
      <Unauthorized error={fetchError} />
    )
    : (
        <Unauthorized error={createModifyError}  />
    )
        
  );
};

export default LogCreateEdit;
