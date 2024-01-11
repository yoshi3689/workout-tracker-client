import { Alert, AlertTitle } from '@mui/material'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { modifyRoutineState } from '../../redux/slices/routineStateSlice';

const RoutineNotification = () => {
  const dispatch = useAppDispatch();
  const { created, modified, date } = useAppSelector(state => state.persistedReducer.routineState);

    useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      dispatch(modifyRoutineState({ modified: false, created: false, date }));
    }, 30000)

    return () => {
      clearTimeout(timeId)
    }
  }, []);
  return (
    <>
      {(modified || created) && (
        <Alert severity= "success" >
          <AlertTitle>Routine
            {modified && " Modified"} {created && " Created"} {(created || modified) && `on ${date}`}
          </AlertTitle>
        </Alert>
      )}
    </>
  )
}

export default RoutineNotification