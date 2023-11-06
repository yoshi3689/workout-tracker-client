import React, { useState, useEffect } from 'react'
import { Routine, Workout } from './routes/Root'
import RoutineRow from './RoutineRow';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Routines: React.FC<{ routines: Routine[], setRoutines: Function }> = ({ routines, setRoutines }) => {
  // const [exercise, setExercise] = useState<string>(""); 
  const params = useParams();
  useEffect(() => {
    axios.get("http://localhost:5001/dashboard/" + params.username)
      .then(res => console.log(res));
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
    </div>
  );
};

export default Routines