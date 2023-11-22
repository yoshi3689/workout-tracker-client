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
import { IRoutine } from '../redux/slices/routineSlice';
import { checkLoginStatus } from '../redux/slices/userSlice';
import RoutineCreate from '../components/RoutineCreate';

const routine:IRoutine = {
  _id: "1",
  name: "1",
  isEditing: false,
  createdAt: new Date(),
  exercises: {
    11: {
      _id: "11",
      name: "11",
      muscleGroups: ["11"],
      sets: {
        111: {
          _id: "111",
          rep: 0,
          weight: 0,
          rest: 0,
        },
        112: {
          _id: "112",
          rep: 0,
          weight: 0,
          rest: 0,
        },
      },
    }
  }
};

const Root = () => {
  
  const [routines, setRoutines] = useState<IRoutine[]>([]);
  const [error, setError] = useState<string>(""); 

  const loggedInUser = useAppSelector(state => {
    return state.persistedReducer.user;
  });

  const dispatch = useAppDispatch();

  
  useEffect(() => {
    console.log(loggedInUser)
    axios.defaults.withCredentials = true;
    axios.get(
      `http://localhost:5001/api/dashboard/` + loggedInUser.username,
      { headers: { "Authorization": `Bearer ${loggedInUser.accessToken}` } }
    )
      .then((res: AxiosResponse) => {
        console.log(res);
        setRoutines(res.data.data);
      })
      .catch((error: AxiosError) => {
        dispatch(checkLoginStatus({ isLoggedIn: false }));
        console.error(error.message);
        setError(error.message);
      });
  }, [dispatch, loggedInUser]);
  
  return (
    <main>
      Welcome {loggedInUser.username}
      {!error ? (
        <>
          <div>
            <h3>List of routines created in the past</h3>
            <Routines routines={routines} setRoutines={setRoutines} />
          </div>
          <div className="stick-to-bottom">
            <h4>
              <label htmlFor="workout-name">Name</label>
            </h4>
              <RoutineCreate 
                routine={routine} />
          </div>
        </>
      )
      :
      (<Unauthorized error={error} />)
    }
      
    </main>
  );
}

export default Root