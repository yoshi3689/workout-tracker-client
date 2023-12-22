import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { AxiosError, AxiosResponse } from 'axios';
import Unauthorized from '../components/Unauthorized';
import { signin } from '../redux/slices/authSlice';
import { request } from '../axios/axios';
import { Box, CircularProgress } from '@mui/material';
import { PATHNAMES, REQUEST_A_R_PREFIX } from '../utils/pathnames';

const SigninPersist = () => {
  const [error, setError] = useState("");
  // get the user state to know when the access token expires
  const isLoggedIn = useAppSelector(state => {
    return state.persistedReducer.auth.isLoggedIn;  
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      request.get(REQUEST_A_R_PREFIX + PATHNAMES.REFRESH, {
      })
        .then((res: AxiosResponse) => {
          dispatch(signin({ accessToken: res.data, isLoggedIn: true }));
        })
        .catch((error: AxiosError) => {
          setError("Signin refresh failed. You need to sign in manually");
          console.error(error.message);
        });
    } else {
      console.debug("logged in. so no need to refresh!")
    }
  }, [isLoggedIn, dispatch])

  const component = isLoggedIn ? (<Outlet />) :
    (!error && !isLoggedIn) ? (<Box sx={{ display: 'flex' }}><CircularProgress /></Box>)
           : (<Unauthorized error='access token expired' />)  
  return (
    <>
      {
        component
      }
    </>
  )
}

export default SigninPersist