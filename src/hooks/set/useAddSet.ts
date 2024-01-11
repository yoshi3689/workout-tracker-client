import { useAppDispatch } from '../../redux/hooks';
import { ISet, addSet } from '../../redux/slices/setsSlice';

export const useAddSet = (sets: Record<string, ISet>, exerciseId: string) => {

  const dispatch = useAppDispatch();

  const handleAdd = () => {
    const setArr = Object.values(sets);
    const setArrLen = setArr.length;
    dispatch(addSet({
      set: {
        ...setArr[setArrLen - 1]
      },
      exerciseId
    }));
  }

  return [handleAdd]
}