import React, {useEffect, useState} from 'react'
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CircleIcon from '@mui/icons-material/Circle';
import TuneIcon from '@mui/icons-material/Tune';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { isMobile } from 'react-device-detect'; 
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Box, Collapse, Container, CssBaseline, IconButton, ToggleButton, ToggleButtonGroup, styled } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearNewRoutine } from '../redux/slices/newRoutineSlice';
import { clearExercises } from '../redux/slices/exerciseSlice';
import { clearSets } from '../redux/slices/setsSlice';
import { colors } from '../utils/useColors';
import RoutinesListView from './RoutinesListView';
import { muscleGroups } from '../utils/filterByBodyPart';
import { IRoutine } from '../redux/slices/routineSlice';


const StyledFab = styled(Fab)({
  zIndex: 10000,
  top: "50%",
  right: 100,
  margin: '0 0 auto 0',
  position: "fixed"
});

export const Dot = (bodyPart: string, createdAt: string) => (
  <CircleIcon key={bodyPart+createdAt} sx={{ color: colors[bodyPart], height: "10px", width: "10px" }} />
)

const Routines: React.FC = () => {
  const routines = useAppSelector(state => state.persistedReducer.routines)
  const [controlledRoutines, setControlledRoutines] = useState<Set<IRoutine>>(new Set());
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.pathname.split("/")[2];
  const [open, setOpen] = useState(true);
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
        rs.forEach(r => {emCrs.add(r)})
      })
      setControlledRoutines(emCrs);
      console.log(filters)
    }
  }, [filters]);

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
      <Container component={Paper} sx={{ padding: "24px", marginBottom: "100px"}}>
        <Box>
          <Box display="flex" alignContent="center" justifyContent="space-between">
          <Typography variant="h5">Check Logs</Typography>
            <Box>
              <IconButton><CalendarMonthIcon /></IconButton>
              <IconButton onClick={() => setOpen(!open)}><TuneIcon /></IconButton>
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
      </Box>
      <RoutinesListView
        routines={filters.length > 0 ? Array.from(controlledRoutines) : routines}
        navigateToLog={navigateToLog}
      />
      <StyledFab color="secondary" onClick={() => onFabClick()}>
              <AddIcon />
            </StyledFab>
      </Container>
  );
};

export default Routines