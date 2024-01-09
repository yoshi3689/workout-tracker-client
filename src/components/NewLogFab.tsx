import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Fab from '@mui/material/Fab';
import { clearNewRoutine } from '../redux/slices/newRoutineSlice';
import { clearExercises } from '../redux/slices/exerciseSlice';
import { clearSets } from '../redux/slices/setsSlice';


const NewLogFab = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { username } = useAuth();

  const navigateToLog = () => {
    navigate(`/dashboard/${username}/log`)
  }

  const onFabClick = () => {
    dispatch(clearNewRoutine());
    dispatch(clearExercises());
    dispatch(clearSets());
    navigateToLog()
  }
  
  return (
    <Fab color="secondary" onClick={() => onFabClick()} sx={{
      zIndex: 10000,
      top: "50%",
      right: 50,
      margin: '0 0 auto 0',
      position: "fixed"}}>
      <AddIcon />
    </Fab>
  )
}

export default NewLogFab