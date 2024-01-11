import { useAppDispatch } from "../../redux/hooks";
import { deleteExercise } from "../../redux/slices/exerciseSlice";

export const useDeleteExercise = (id: string) => {
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(deleteExercise(id));
  };
  return [handleDelete] as const
}