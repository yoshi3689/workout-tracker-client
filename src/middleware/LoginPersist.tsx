import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from "../redux/hooks";
import axios, { AxiosError, AxiosResponse } from 'axios';
import Unauthorized from '../components/Unauthorized';
import { loginOrRegister } from '../redux/slices/userSlice';
import { request } from '../axios/axios';

const LoginPersist = () => {
  const [error, setError] = useState("");
  // get the user state to know when the access token expires
  const isLoggedIn = useAppSelector(state => {
    return state.persistedReducer.user.isLoggedIn;  
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      request.get("api/refresh/", {
        withCredentials: true,
      })
        .then((res: AxiosResponse) => {
          dispatch(loginOrRegister({ accessToken: res.data, isLoggedIn: true }));
        })
        .catch((error: AxiosError) => {
          setError("login refresh failed. You need to log in manually");
          console.error(error.message);
        });
    } else {
      console.debug("logged in. so no need to refresh!")
    }
  }, [isLoggedIn, dispatch])

  return (
    <>
      {isLoggedIn
        ?(<Outlet />)
        :(<Unauthorized error='access token expired' />)
      }
    </>
  )
}

export default LoginPersist