import React, { ChangeEvent, useEffect, useState } from "react";
import { Exercise, Workout } from "./routes/Root"

const ExerciseDropdown: React.FC<{setWorkout:Function, workout: Workout, routineId:number }> = ({ setWorkout, workout, routineId }) => {
  
  const [exercises, setExercises] = useState<Exercise[]>([])

  const handleChange = (value:string) => {
    setWorkout({
      ...workout,
      exercise: value
    });
  }
  useEffect(() => {
    fetch("/api/exercises")
      .then((res) => res.json())
      .then((data) => setExercises(data));
  }, []);
  return (
    <div>
      <label htmlFor="exercise">Exercise name:</label>

      {exercises && exercises[0] && (
        <select
          name="exercise"
          id="exercise"
          value={workout.exercise}
          onChange={(e) => handleChange(e.target.value)}
        >
          {exercises.map((e, i) => (
            <option key={e.name+routineId+i} value={e.name}>
              {e.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default ExerciseDropdown