import React, { useEffect, useState } from "react";
import { IExercise } from "../redux/slices/exerciseSlice";
import exercises from "../data/exercises.json";

const ExerciseDropdown: React.FC<{setExercise:Function, exercise: IExercise, routineId:string }> = ({ setExercise, exercise, routineId }) => {
  

  const handleChange = (value:string) => {
    setExercise({
      ...exercise,
      exercise: value
    });
  }
  
  return (
    <>
      <label htmlFor="exercise">Exercis name:</label>

      {exercises && exercises[0] && (
        <select
          name="exercise"
          id="exercise"
          value={exercise.name}
          onChange={(e) => handleChange(e.target.value)}
        >
          {exercises.map((e, i) => (
            <option key={e.name + routineId + i} value={e.name}>
              {e.name}
            </option>
          ))}
        </select>
      )}
    </>
  );
}

export default ExerciseDropdown