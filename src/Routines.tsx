import React, { useState, useEffect } from 'react'
import { Routine, Workout } from './routes/Root'
import RoutineRow from './RoutineRow';
import axios, { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import Unauthorized from './Unauthorized';

const Routines: React.FC<{ routines: Routine[], setRoutines: Function }> = ({ routines, setRoutines }) => {
  const [error, setError] = useState<string>(""); 
  const params = useParams();
  useEffect(() => {
    axios.get("http://localhost:5001/dashboard/" + params.username)
      .then(res => console.log(res))
      .catch((error: AxiosError) => {
        console.error(error.message);
        setError(error.message);
      })
      ;
  }, [params])

  return (
    <div>
      Routines
      {/* {routine.name && <RoutineRow routine={routine} key={routine.name} />} */}
      {routines &&
        routines.map((routine) => (
          <RoutineRow
            routine={routine}
            key={routine.name}
            setRoutines={setRoutines}
            routines={routines}
          />
        ))}
      {error && (<Unauthorized error={error} />)}
    </div>
  );
};

export default Routines