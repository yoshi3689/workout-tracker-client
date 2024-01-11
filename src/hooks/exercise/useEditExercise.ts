import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { IExercise, editExercise } from "../../redux/slices/exerciseSlice";

export const useEditExercise = (exercise: IExercise) => {
  const [MuscleGroup, setMuscleGroup] = useState<string>(exercise.muscleGroups[0]? exercise.muscleGroups[0] : "abdominals");
  const [ExerciseName, setExerciseName] = useState<string>(exercise.name);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(editExercise({
      ...exercise,
      name: ExerciseName,
      muscleGroups: [MuscleGroup]
    }));
  }, [ExerciseName])
  return [MuscleGroup, setMuscleGroup, setExerciseName] as const
}