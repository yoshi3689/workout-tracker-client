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

  return ((!fetchError && !createModifyError)
    ? (
      <Container component={Paper} sx={{paddingBlock: "24px", marginBottom: "100px"}}>
      <Box display={"flex"}>
        <Typography gutterBottom variant="h5">Log Workout</Typography>
      </Box>
      <Box sx={{ paddingBottom: "24px" }}>
        {routine.isEditing && routine._id
          ? <Typography>Editing {formatDateString(routine.createdAt)}</Typography>
          : <>
            <Typography>Creating new routine</Typography>
            <Button onClick={() => setIsModalOpen(true)}>Use Previous Log to Start</Button>
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
    </Container>
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
