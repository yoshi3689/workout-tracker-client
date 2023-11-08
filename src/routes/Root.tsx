import React, { useState, useEffect } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import Routines from '../components/Routines'
import Unauthorized from '../components/Unauthorized';

export type Set = {
  rep?: number;
  rest?: number;
  weight?: number;
};
export type Workout = {
  exercise: string;
  sets: Set[];
  totalReps: number;
};
export type Routine = {
  id: number;
  name: string;
  workouts: Workout[];
};

export type Exercise = {
    name: string;
    muscleGroup: string;
  };

const Root = () => {

  const [workoutName, setWorkoutName] = useState("");
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [error, setError] = useState<string>(""); 
  const params = useParams();
  useEffect(() => {
    axios.get("http://localhost:5001/dashboard/" + params.username)
      .then((res: AxiosResponse) => {
        console.log(res)
        setRoutines(res.data);
      })
      .catch((error: AxiosError) => {
        console.error(error.message);
        setError(error.message);
      })
      ;
  }, [params])
  


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
      { id: routines.length,
        name: workoutName,
        workouts: []
    }]);
    setWorkoutName("");
  }
  return (
    <main>
      {(routines && !error) && (<div>
        <div>
        <h3>List of routines created in the past</h3>
        <Routines routines={routines} setRoutines={setRoutines} />
      </div>
      <div className="stick-to-bottom">
        <h4>
          <label htmlFor="workout-name">Name</label>
        </h4>
        <div>
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
      </div>)}
      {error && (<Unauthorized error={error} />)}
    </main>
  );
}

export default Root