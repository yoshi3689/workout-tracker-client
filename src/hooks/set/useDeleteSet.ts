import React from 'react'
import { useAppDispatch } from '../../redux/hooks';
import { deleteSet } from '../../redux/slices/setsSlice';

export const useDeleteSet = (setId: string, exerciseId: string) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteSet({ setId, exerciseId }));
  }
  return [handleDelete]
}
