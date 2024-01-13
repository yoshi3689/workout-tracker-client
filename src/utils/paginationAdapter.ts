import { newRoutineInitialState } from "../redux/slices/newRoutineSlice";
import { IRoutine } from "../redux/slices/routineSlice";

const itemPerPage = 6;

export const adoptForPagination = (arr: any[]) => {
  return arr.reduce<any[][]>((acc, curr, i) => {
    const index = Math.floor(i / itemPerPage);
    if (!acc[index]) {
      acc[index] = [];
    }
    acc[index].push(curr);
    return acc;
  }, []);
}

export const findSelectedRoutine = (paginatedRoutines: IRoutine[][], id: string): IRoutine => {
  for (let i = 0; i < paginatedRoutines.length; i++) {
    const found = paginatedRoutines[i].find(r => r._id === id);
    if (found) return found;
  }
  return newRoutineInitialState;
}
