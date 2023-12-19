import React from 'react'
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CircleIcon from '@mui/icons-material/Circle';
import TuneIcon from '@mui/icons-material/Tune';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { isMobile } from 'react-device-detect'; 
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Box, Collapse, Container, CssBaseline, IconButton, styled } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearNewRoutine } from '../redux/slices/newRoutineSlice';
import { clearExercises } from '../redux/slices/exerciseSlice';
import { clearSets } from '../redux/slices/setsSlice';
import { colors } from '../utils/useColors';
import RoutinesListView from './RoutinesListView';


const StyledFab = styled(Fab)({
  zIndex: 10000,
  top: "50%",
  margin: '0 0 auto 0',
  position: "fixed"
});

export const muscleGroups: string[] = [
  "abs",
  "chest",
  "legs",
  "shoulders",
  "back",
  "arms",
];

// export const muscleColors = [
//   color: colors["abs"]
// color: colors["chest"]
// color: colors["legs"]
// color: colors["shoulders"]
// color: colors["back"]
// color: colors["arms"]
// ]

export const Dot = (color: string) => (
  <CircleIcon sx={{ color: color, height: "10px", width: "10px" }} />
)

const Dots = (
  <Box sx={{marginBottom: "16px"}}>
    {muscleGroups.map(mg => (
      <IconButton sx={{marginLeft: "4px"}} >
          {Dot(colors[mg])}
        <Typography alignSelf="center" textAlign="center" variant='caption'>
          {mg}
        </Typography>
      </IconButton>
    ))}
  </Box>
);

const Routines: React.FC = () => {
  const routines = useAppSelector(state => state.persistedReducer.routines)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.pathname.split("/")[2];
  const [open, setOpen] = React.useState(true);

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
          {Dots}
          </Collapse>
          
          <CssBaseline />
      </Box>
      <RoutinesListView
        routines={routines}
        navigateToLog={navigateToLog}
      />
      <StyledFab color="secondary" onClick={() => onFabClick()}>
              <AddIcon />
            </StyledFab>
      </Container>
  );
};

export default Routines