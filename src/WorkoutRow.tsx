import React, { useState } from 'react'
import ExerciseDropdown from './ExerciseDropdown';
import SetRow from './SetRow';
import { Routine, Workout } from './routes/Root';

// represent a workout containing info such as 
// exercise, total reps, sets and etc
const WorkoutRow: React.FC<{ workout: Workout, setRoutines: Function, routineId: number, routines: Routine[] }> = ({
  workout, setRoutines, routineId, routines
}) => {
  // build a function that modifies a routine in the list.
  // specifically the workouts of the routine by reflecting the state change
  // in workouts list
  const [currentWorkout, setCurrentWorkout] = useState<Workout>({
    exercise: "",
    totalReps: 0,
    sets: [
      {
        rep: 0,
        rest: 0,
        weight: 0,
      },
    ],
  });

  const handleAdd = () => {
    setCurrentWorkout({
      ...currentWorkout,
      sets: [...currentWorkout.sets, { rep: 0, rest: 0, weight: 0 }],
    });
  }
  return (
    <div className='row'>
      WorkoutRow
      <ExerciseDropdown routineId={routineId} workout={currentWorkout} setWorkout={setCurrentWorkout} />
      <h6>Sets:</h6>
      <div>
        {currentWorkout.sets && currentWorkout.sets.map((set, i) => <SetRow workout={currentWorkout} key={""+i+routineId} set={set} setWorkout={setCurrentWorkout} />)}
        <button onClick={handleAdd}>Add Set</button>
        <button >---Remove Exercise</button>
      </div>
      {workout.totalReps}
    </div>
  );
};

export default WorkoutRow;