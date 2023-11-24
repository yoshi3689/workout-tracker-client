import React, { useState, useEffect } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios';
import Routines from '../components/Routines'
import Unauthorized from '../components/Unauthorized';
// import RoutineRow from "../components/RoutineRow";

// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import Paper from "@mui/material/Paper";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Typography from "@mui/material/Typography";

import { useAppSelector } from '../redux/hooks';
import { useAppDispatch } from '../redux/hooks';
import { IRoutine, getRoutines } from '../redux/slices/routineSlice';
import { checkLoginStatus } from '../redux/slices/userSlice';
import RoutineCreate from '../components/RoutineCreate';

const routine:IRoutine = {
  _id: "1",
  name: "1",
  isEditing: false,
  createdAt: new Date().toISOString(),
  exercises: []
};

const Root = () => {
  
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
  }, [loggedInUser]);
  
  return (
    <main
    // style={{ "display": "flex", "justifyContent": "center" }}
    >
      Welcome {loggedInUser.username}
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
              routine={routine}
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