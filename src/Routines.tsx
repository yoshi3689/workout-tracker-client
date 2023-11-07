import React from 'react'
import { Routine } from './routes/Root'
import RoutineRow from './RoutineRow';

const Routines: React.FC<{ routines: Routine[], setRoutines: Function }> = ({ routines, setRoutines }) => {
  

  return (
    <div>
      Routines
        {routines.map((routine) => (
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