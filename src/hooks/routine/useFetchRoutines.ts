import { useMemo, useEffect, useState } from 'react'
import { useAppDispatch } from '../../redux/hooks';
import { getRoutines } from '../../redux/slices/routineSlice';
import { checkSigninStatus } from '../../redux/slices/authSlice';
import { getErrorMessage } from '../../utils/getErrorMessage';

export const useFetchRoutines = (accessToken: string, username: string) => {
  const [fetchError, setFetchError] = useState<string>(""); 
  const dispatch = useAppDispatch();
  const fetchRoutines = useMemo(() => async () => {
    try {
      await dispatch(getRoutines({ accessToken: accessToken, username })).unwrap();
    } catch (err) {
      setFetchError(getErrorMessage(err));
      dispatch(checkSigninStatus({
        isLoggedIn: false,
        accessToken: ''
      }));
    }
  }, [accessToken, username]);

  useEffect(() => {
    fetchRoutines();
  }, [accessToken]);
  return { fetchError }
}