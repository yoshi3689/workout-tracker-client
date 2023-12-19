import React from 'react'
import RoutineRow from './RoutineRow';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
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


const StyledFab = styled(Fab)({
  zIndex: 10000,
  top: "50%",
  margin: '0 0 auto 0',
  position: "fixed"
});

export const filters = [
  { muscle: "abs", color: colors["abs"] },
  { muscle: "chest", color: colors["chest"] },
  { muscle: "legs", color: colors["legs"] },
  { muscle: "shoulders", color: colors["shoulders"] },
  { muscle: "back", color: colors["back"] },
  { muscle: "arms", color: colors["arms"] },
];

export const Dot = (color: string) => (
  <CircleIcon sx={{ color: color, height: "10px", width: "10px" }} />
)

const Dots = (
  <Box sx={{marginBottom: "16px"}}>
    {filters.map(f => (
      <IconButton sx={{marginLeft: "4px"}} >
          {Dot(f.color)}
        <Typography alignSelf="center" textAlign="center" variant='caption'>
          {f.muscle}
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
    <TableContainer component={Paper} >
      <Table aria-label="collapsible table">
        {/* <TableHead>
          <TableRow>
            <TableCell colSpan={2}>
              <Typography textAlign={"center"} component="h4">Routines</Typography>
            </TableCell>
          </TableRow>
        </TableHead> */}
        <TableBody>
          {routines && routines.map((routine) => (
                <RoutineRow
                  key={routine._id}
                  routine={routine}
                  isNew={false}
                  navigateToLog={navigateToLog}
                ></RoutineRow>
            ))
            }
          </TableBody>
        </Table>
        
        </TableContainer>
          <Box display={"flex"} justifyContent={"end"} position={"sticky"}>
        <StyledFab color="secondary" onClick={() => onFabClick()}>
              <AddIcon />
            </StyledFab>
      </Box>
      </Container>
  );
};

export default Routines