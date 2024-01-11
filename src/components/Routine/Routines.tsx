import React, {ReactElement, useEffect, useState} from 'react'
import Typography from "@mui/material/Typography";

import CircleIcon from '@mui/icons-material/Circle';
import TuneIcon from '@mui/icons-material/Tune';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { isMobile } from 'react-device-detect'; 
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Box, Button, Collapse, Container, CssBaseline, IconButton, ToggleButton, ToggleButtonGroup, styled } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearNewRoutine, editNewRoutine } from '../../redux/slices/newRoutineSlice';
import { IExercise, clearExercises, loadExercises } from '../../redux/slices/exerciseSlice';
import { ISet, loadSets } from '../../redux/slices/setsSlice';
import { colors } from '../../utils/useColors';
import RoutinesListView from './RoutinesListView';
import { muscleGroups } from '../../utils/filterByBodyPart';
import { IRoutine } from '../../redux/slices/routineSlice';
import useAuth from '../../hooks/useAuth';
import { selectRoutineTemplate } from '../../redux/slices/routineTemplateSlice';

export const Dot = (bodyPart: string, createdAt: string) => (
  <CircleIcon key={bodyPart+createdAt} sx={{ color: colors[bodyPart], height: "10px", width: "10px" }} />
)

const Routines: React.FC<{titleTextElement: ReactElement, onSelectCallBack?: Function}> = ({ titleTextElement, onSelectCallBack }) => {
  const routines = useAppSelector(state => state.persistedReducer.routines)
  const [controlledRoutines, setControlledRoutines] = useState<Set<IRoutine>>(new Set());
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { username } = useAuth();
  const [open, setOpen] = useState(true);
  const [filters, setFilters] = useState<string[]>([]);

  const routineId = useAppSelector(selectRoutineTemplate);
  const routine = routines.find(r => r._id === routineId);
  
  const navigateToLog = () => {
    navigate(`/dashboard/${username}/log`)
  }

  const handleSubmit = (isTemplate: boolean) => {
    if (routine) {
      dispatch(editNewRoutine({
      ...routine, isEditing: true, exercises: []
      , _id: isTemplate ? "" : routine._id
    }));
    let exercises: Record<string, IExercise> = {};
    routine.exercises.forEach(e => {
      exercises[e._id] = {...e, sets: []}
    });
    dispatch(loadExercises(exercises));
    const sets: Record<string, Record<string, ISet>> = {};
      routine.exercises.forEach(e => {
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
      console.log(filters)
    }
  }, [filters]);

  
  return (
      <>
        <Box>
        <Box>
          <Box display={"flex"} alignItems="center" >
            {titleTextElement}
            <IconButton onClick={() => setOpen(!open)}><TuneIcon /></IconButton>
            <Box>

          </Box>
          </Box>
        </Box>

          <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{marginBottom: "16px",  overflowX:"scroll"}}  >
            <ToggleButtonGroup
              value={filters}
              onChange={handleFilterChange}
            >
            {muscleGroups.map(mg => (
            <ToggleButton value={mg} key={mg} sx={{marginLeft: "4px"}} >
                {Dot(mg, new Date().toDateString())}
              <Typography alignSelf="center" textAlign="center" variant='caption'>
                {mg}
              </Typography>
            </ToggleButton>
          ))}
          </ToggleButtonGroup>
        </Box>
        </Collapse>
          
        <CssBaseline />
        <Box>
          <Button size="small" sx={{mr: 2}} variant="contained" disabled={!routineId ? true : false} onClick={() => handleSubmit(true)}>Use as Template</Button>
          <Button size="small" variant="contained" disabled={!routineId ? true : false} onClick={() => handleSubmit(false)}>Edit</Button>
        </Box>
        </Box>
        <Box sx={{overflow: "hidden", overflowY: "scroll", height: "70%", mt: 2, paddingInline: "2px"}}>
          <RoutinesListView
            routines={filters.length > 0 ? Array.from(controlledRoutines) : routines}
          />
        </Box>

      </>
  );
};

export default Routines