import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom"

import Routines from '../../components/Routines'
import Unauthorized from '../../components/Unauthorized';


import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getRoutines } from '../../redux/slices/routineSlice';
import { checkSigninStatus, selectAccessToken } from '../../redux/slices/authSlice';
import { Box, Typography } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import NewLogFab from '../../components/NewLogFab';
import { modifyRoutineState, selectRoutineState } from '../../redux/slices/routineStateSlice';
import { Alert, AlertTitle } from '@mui/material';


const Root = () => {
  const { username } = useAuth();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>(""); 
  const { created, modified, date } = useAppSelector(state => selectRoutineState(state))

  const accessToken = useAppSelector(selectAccessToken);

  const fetchRoutines = async () => {
    try {
      await dispatch(getRoutines({accessToken: accessToken, username })).unwrap();
    } catch (err) {
      dispatch(checkSigninStatus({
        isLoggedIn: false,
        accessToken: ''
      }));
    }
  }

  useEffect(() => {
    fetchRoutines();
  }, [accessToken]);

  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      dispatch(modifyRoutineState({ modified: false, created: false, date }));
    }, 30000)

    return () => {
      clearTimeout(timeId)
    }
  }, []);

  const notificationBox = (
    <Alert severity="success">
      <AlertTitle>Routine {modified && " Modified"} {created && " Created"} {(created || modified) && `on ${date}`}</AlertTitle>
    </Alert >
  ) 
  console.log(modified, created)
  
  return (
    <Box component={"main"} sx={{ padding: 6, marginBottom: "100px" }}>
      {!error ? (
        <Box>
          {(modified || created) && notificationBox}
          <Routines titleTextElement={<Typography variant='h5'>Past Logs</Typography>} />
          <NewLogFab />
        </Box>
      ) : (
        <Unauthorized error={error} />
        )}
    </Box>
  );
}

export default Root