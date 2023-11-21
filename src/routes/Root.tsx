import React, { useState, useEffect } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios';
import Routines from '../components/Routines'
import Unauthorized from '../components/Unauthorized';
import RoutineRow from "../components/RoutineRow";

import { useAppSelector } from '../redux/hooks';
import { useAppDispatch } from '../redux/hooks';
import { IRoutine } from '../redux/slices/routineSlice';
import { checkLoginStatus } from '../redux/slices/userSlice';

const routine:IRoutine = {
  _id: "1",
  name: "1",
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
  const [workoutName, setWorkoutName] = useState("");
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
  


  // set to the initial state
  // , and close the form (in the future)
  const handleCancel = () => {
    setWorkoutName("");
  }

  // for now just add the new workout routine to an array
  // add a new workout routine to the list(probs API call to the DB)
  // reset the name
  const handleCreate = () => {
    // should I make an interface for Routine type or no??
    setRoutines([...routines,
      { _id: "",
        name: workoutName,
        exercises: {},
        createdAt: new Date()
    }]);
    setWorkoutName("");
  }
  return (
    <main>
      Welcome {loggedInUser.username}
      {!error && (
        <div>
          <div>
            <h3>List of routines created in the past</h3>
            <Routines routines={routines} setRoutines={setRoutines} />
          </div>
          <div className="stick-to-bottom">
            <h4>
              <label htmlFor="workout-name">Name</label>
            </h4>
            <div>
              <RoutineRow
                key={routine.name}
                routine={routine}
                setRoutines={setRoutines}
                routines={routines}
                isNew={false}
              />
              <input
                type="text"
                name="workout-name"
                id="workout-name"
                onChange={(e) => setWorkoutName(e.target.value)}
              />
            </div>
            <div>
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={handleCreate}>Create+</button>
            </div>
          </div>
        </div>
      )}
      {error && <Unauthorized error={error} />}
    </main>
  );
}

export default Root