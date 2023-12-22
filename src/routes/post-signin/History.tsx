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
import Metrics from '../../components/Metrics';


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
    <Box component={"main"} sx={{ padding: "24px", marginBottom: "100px"}}>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Metrics title="Workout Streak" adornment='days' count={100} percentage={59.3} extra="35,000" isProgress={false} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Metrics title="Total Weight Lifted" adornment='lbs' count={442236} percentage={59.3} extra="35,000" isProgress={true} />
      </Grid>
      
      {!error ? (
        <Routines />
      ) : (
        <Unauthorized error={error} />
        )}
      </Grid>
    </Box>
  );
}

export default Root