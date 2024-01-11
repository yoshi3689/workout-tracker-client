import React, { useState, useEffect } from 'react'
import Routines from '../../components/Routine/Routines'
import Unauthorized from '../../components/Error/Unauthorized';

import { useAppSelector } from '../../redux/hooks';
import { selectAccessToken } from '../../redux/slices/authSlice';
import { Box, Typography } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import NewLogFab from '../../components/Routine/NewLogFab'
import { useFetchRoutines } from '../../hooks/routine/useFetchRoutines';
import RoutineNotification from '../../components/Routine/RoutineNotification';


const Root = () => {
  const accessToken = useAppSelector(selectAccessToken);
  const { username } = useAuth();
  const { fetchError } = useFetchRoutines(accessToken, username);
  
  return (
    <Box component={"main"} sx={{ padding: 6, marginBottom: "100px" }}>
      {!fetchError ? (
        <Box>
          <RoutineNotification />
          <Routines titleTextElement={<Typography variant='h5'>Past Logs</Typography>} />
          <NewLogFab />
        </Box>
      ) : (
        <Unauthorized error={fetchError} />
        )}
    </Box>
  );
}

export default Root