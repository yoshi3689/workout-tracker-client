import React, { useState } from 'react'
import { useAppDispatch } from '../../redux/hooks';
import { addRoutine, modifyRoutine } from '../../redux/slices/routineSlice';
import { modifyRoutineState } from '../../redux/slices/routineStateSlice';
import { checkSigninStatus } from '../../redux/slices/authSlice';
import { getErrorMessage } from '../../utils/getErrorMessage';

export const useCreateModifyRoutine = () => {
  const dispatch = useAppDispatch();
  const [createModifyError, setCreateModifyError] = useState("")
  const handleCreateAndModify = async (isIdEmpty: boolean, username: string) => {
    try {
        await dispatch(isIdEmpty ? addRoutine(username) : modifyRoutine(username));
        dispatch(modifyRoutineState({
          date: new Date().toDateString(),
          created: isIdEmpty,
          modified: !isIdEmpty
        }));
    } catch (err) {
      setCreateModifyError(getErrorMessage(err));
      dispatch(checkSigninStatus({
        isLoggedIn: false,
        accessToken: ''
      }));
    }
  };
  return { createModifyError, handleCreateAndModify }
}