import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom"

import Routines from '../../components/Routines'
import Unauthorized from '../../components/Unauthorized';
import RoutineCreate from './RoutineCreateEditLog';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getRoutines } from '../../redux/slices/routineSlice';
import { checkSigninStatus, selectAccessToken } from '../../redux/slices/authSlice';
import { Box, Container, Grid, Typography } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import Metrics from '../../components/RecordsCard';
import NewLogFab from '../../components/NewLogFab';


const Root = () => {
  const { username } = useAuth();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>(""); 

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
  
  return (
    <Box component={"main"} sx={{ padding: 6, marginBottom: "100px" }}>
      {!error ? (
        <Box>
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