import React, { useEffect, useState } from 'react'
import { IRoutine } from '../../redux/slices/routineSlice';

export const useRoutineFilters = (routines: IRoutine[]) => {
  const [controlledRoutines, setControlledRoutines] = useState<Set<IRoutine>>(new Set());
  const [filters, setFilters] = useState<string[]>([]);
  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilters: string[],
  ) => {
    setFilters(newFilters);
  };
  useEffect(() => {
    if (filters.length >= 1) {
      const emCrs = new Set<IRoutine>();
      filters.forEach((f, fi) => {
        const rs = routines.filter(r => r.muscleGroups.includes(f))
        rs.forEach(r => { emCrs.add(r) })
      })
      setControlledRoutines(emCrs);
      // console.log(filters)
    }
  }, [filters]);
  return {controlledRoutines, filters, handleFilterChange}
}