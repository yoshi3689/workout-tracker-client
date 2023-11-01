import React, { useEffect, useState } from 'react'
import { Routine, Workout } from './routes/Root';
// import ExerciseDropdown from './ExerciseDropdown';
import WorkoutRow from './WorkoutRow';

// represent a whole workout routine
const RoutineRow: React.FC<{ routine: Routine, setRoutines: Function, routines: Routine[]  }> = ({ routine, setRoutines, routines }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([
    { exercise: "", totalReps: 0, sets: [] },
  ]);
  useEffect(() => {
    console.log(workouts);
  }, [workouts]);


  // add a new workout
  const handleAdd = () => {
    setWorkouts([...workouts, { exercise: "", totalReps: 0, sets: [] }]);
  };
  return (
    <div className="row">
      <h4>Routine name: {routine.name}</h4>
      <div>
        <h5>List of workout</h5>
        <div>
          {workouts.map((workout, i) => (
            <WorkoutRow
              workout={workout}
              routineId={routine.id}
              key={i + "" + routine.id}
              setRoutines={setRoutines}
              routines={routines}
            />
          ))}
        </div>
      </div>
      <div>
        <button onClick={handleAdd}>Add Exercise +</button>
      </div>
    </div>
  );
};

export default RoutineRow