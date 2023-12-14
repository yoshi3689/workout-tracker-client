import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom"

import Routines from '../components/Routines'
import Unauthorized from '../components/Unauthorized';
import RoutineCreate from './UserCreateEditLog';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getRoutines } from '../redux/slices/routineSlice';
import { checkSigninStatus } from '../redux/slices/userSlice';
import { Box, Container, Typography } from '@mui/material';


const Root = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>(""); 
  const fetchRoutines = async () => {
    try {
      await dispatch(getRoutines({accessToken:loggedInUser.accessToken, username: location.pathname.split("/")[2] })).unwrap();
    } catch (err) {
      dispatch(checkSigninStatus({
        isLoggedIn: false,
        email: '',
        accessToken: ''
      }));
    }
  }

  const loggedInUser = useAppSelector(state => {
    return state.persistedReducer.user;
  });

  useEffect(() => {
    fetchRoutines();
  }, [loggedInUser]);

  
  
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