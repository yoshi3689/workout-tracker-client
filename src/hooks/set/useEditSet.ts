import React, { SetStateAction, useEffect, useState } from 'react'
import { ISet, editSet } from '../../redux/slices/setsSlice';
import { useAppDispatch } from '../../redux/hooks';

export const useEditSet = (set: ISet, exerciseId: string) => {
  const [rest, setRest] = useState<number>(set.rest);
  const [weight, setWeight] = useState<number>(set.weight);
  const [rep, setRep] = useState<number>(set.rep);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      editSet({
        set: {
          ...set, rest, weight, rep
        },
        exerciseId
      }));
  }, [rest, weight, rep]
  );
  return [setRep, setRest, setWeight]
}