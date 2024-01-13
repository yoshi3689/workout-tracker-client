import { useAppDispatch } from '../../redux/hooks';
import { editNewRoutine } from '../../redux/slices/newRoutineSlice';
import { IExercise, loadExercises } from '../../redux/slices/exerciseSlice';
import { ISet, loadSets } from '../../redux/slices/setsSlice';
import { IRoutine } from '../../redux/slices/routineSlice';
import { useNavigate } from 'react-router-dom';

export const useFillLog = (username: string, selectedRoutine?: IRoutine, onSelectCallBack?: Function) => {
  const dispatch = useAppDispatch();
  
  const navigate = useNavigate();

  const navigateToLog = () => {
    navigate(`/dashboard/${username}/log`)
  }

  const handleSubmit = (isTemplate: boolean) => {
    if (selectedRoutine) {
      dispatch(editNewRoutine({
        ...selectedRoutine, isEditing: true, exercises: []
        , _id: isTemplate ? "" : selectedRoutine._id
      }));
      let exercises: Record<string, IExercise> = {};
      selectedRoutine.exercises.forEach(e => {
        exercises[e._id] = { ...e, sets: [] }
      });
      dispatch(loadExercises(exercises));
      const sets: Record<string, Record<string, ISet>> = {};
      selectedRoutine.exercises.forEach(e => {
        sets[e._id] = {};
        e.sets.forEach(s => {
          sets[e._id][s._id] = s
        })
      });
      dispatch(loadSets(sets))
      navigateToLog();
    }
    if (onSelectCallBack) onSelectCallBack();
  }
  return {handleSubmit}
}