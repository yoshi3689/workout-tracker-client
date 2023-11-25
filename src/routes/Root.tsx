import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom"

import Routines from '../components/Routines'
import Unauthorized from '../components/Unauthorized';
import RoutineCreate from '../components/RoutineCreate';

import { useAppSelector } from '../redux/hooks';
import { useAppDispatch } from '../redux/hooks';
import { IRoutine, getRoutines } from '../redux/slices/routineSlice';
import { checkLoginStatus } from '../redux/slices/userSlice';


const Root = () => {
  const location = useLocation();
  const [routines, setRoutines] = useState<IRoutine[]>([]);
  const [error, setError] = useState<string>(""); 

  const loggedInUser = useAppSelector(state => {
    return state.persistedReducer.user;
  });

  const dispatch = useAppDispatch();

  const fetchRoutines = async () => {
    try {
      const routines = await dispatch(getRoutines(loggedInUser.accessToken)).unwrap();
      setRoutines(routines);
    } catch (err) {
      dispatch(checkLoginStatus({ isLoggedIn: false }));
      // console.error(err.message);
      // setError(err.message);
    }
  }
  useEffect(() => {
    fetchRoutines();
    console.log(loggedInUser);
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
            <Routines routines={routines} setRoutines={setRoutines} />
          </div>
          <div className="stick-to-bottom">
            <h4>
              <label htmlFor="workout-name">Name</label>
            </h4>
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