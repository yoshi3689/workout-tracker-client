import React from 'react'
import { useAppDispatch } from '../../redux/hooks';
import { clearNewRoutine } from '../../redux/slices/newRoutineSlice';
import { clearExercises } from '../../redux/slices/exerciseSlice';
import { clearSets } from '../../redux/slices/setsSlice';

export const useClearRoutine = () => {
  const dispatch = useAppDispatch();
  const handleClear = () => {
    dispatch(clearNewRoutine());
    dispatch(clearExercises())
    dispatch(clearSets())
  };
  return handleClear
}