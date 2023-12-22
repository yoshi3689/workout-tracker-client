import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom"

import Routines from '../../components/Routines'
import Unauthorized from '../../components/Unauthorized';
import RoutineCreate from './RoutineCreateEditLog';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getRoutines } from '../../redux/slices/routineSlice';
import { checkSigninStatus, selectAccessToken } from '../../redux/slices/authSlice';
import { Box, Container, Typography } from '@mui/material';


const Root = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>(""); 

  const accessToken = useAppSelector(selectAccessToken);

  const fetchRoutines = async () => {
    try {
      await dispatch(getRoutines({accessToken: accessToken, username: location.pathname.split("/")[2] })).unwrap();
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
    <Box component={"main"}>

      
      {!error ? (
        <Routines />
      ) : (
        <Unauthorized error={error} />
      )}
    </Box>
  );
}

export default Root