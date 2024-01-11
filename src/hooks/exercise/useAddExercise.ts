import React from 'react'
import { useAppDispatch } from '../../redux/hooks';
import { IExercise, addExercise, exerciseSkelton } from '../../redux/slices/exerciseSlice';
import { addSet, setSkelton } from '../../redux/slices/setsSlice';
import exerciseData from "../../data/exercises.json"

export const useAddExercise = () => {
  const dispatch = useAppDispatch();
  // add a new exercise and a set
  const handleAdd = () => {
    const exercisesAdded: { payload: IExercise, type: string } =
      dispatch(addExercise({
        ...exerciseSkelton,
        name: exerciseData.abdominals[0].name,
        muscleGroups: [exerciseData.abdominals[0]['muscle group']],
      }));
    dispatch(addSet({
      set: {
        ...setSkelton
      },
      exerciseId: exercisesAdded.payload._id
    }));
  };

  return [handleAdd] as const
}