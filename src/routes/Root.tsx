import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom"

import Routines from '../components/Routines'
import Unauthorized from '../components/Unauthorized';
import RoutineCreate from '../components/RoutineCreate';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { IRoutine, getRoutines } from '../redux/slices/routineSlice';
import { checkLoginStatus } from '../redux/slices/userSlice';


const Root = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>(""); 
  const fetchRoutines = async () => {
    try {
      await dispatch(getRoutines({accessToken:loggedInUser.accessToken, username: location.pathname.split("/")[2] })).unwrap();
    } catch (err) {
      dispatch(checkLoginStatus({ isLoggedIn: false }));
    }
  }

  const loggedInUser = useAppSelector(state => {
    return state.persistedReducer.user;
  });

  useEffect(() => {
    fetchRoutines();
  }, [loggedInUser]);

  
  
  return (
    <main
    // style={{ "display": "flex", "justifyContent": "center" }}
    >
      Welcome {location.pathname.split("/")[2]}
      {!error ? (
        <>
          <div >
            <h3>List of routines created in the past</h3>
            <Routines loggedInUser={loggedInUser} />
          </div>
        <br />
        <br />
        <br />
      
          <div className="stick-to-bottom">
            <RoutineCreate
              accessToken={
                loggedInUser.accessToken ? loggedInUser.accessToken : ""
              }
            />
          </div>
        </>
      ) : (
        <Unauthorized error={error} />
      )}
    </main>
  );
}

export default Root