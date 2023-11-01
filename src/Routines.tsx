import React, { useState } from 'react'
import { Routine, Workout } from './routes/Root'
import RoutineRow from './RoutineRow';

const Routines: React.FC<{ routines: Routine[], setRoutines: Function }> = ({ routines, setRoutines }) => {
  // const [exercise, setExercise] = useState<string>(""); 

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