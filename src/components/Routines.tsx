import React from 'react'
import RoutineRow from './RoutineRow';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { isMobile } from 'react-device-detect'; 
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Box, Container, styled } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearNewRoutine } from '../redux/slices/newRoutineSlice';
import { clearExercises } from '../redux/slices/exerciseSlice';
import { clearSets } from '../redux/slices/setsSlice';

const StyledFab = styled(Fab)({
  zIndex: 10000,
  // bottom: 100,
  // right: 100,
  margin: '0 0 auto 0',
  position: "fixed"
});
const Routines: React.FC = () => {
  const routines = useAppSelector(state => state.persistedReducer.routines)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.pathname.split("/")[2];

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
          <Container component={"main"}>
      <Container component={Paper}  sx={{ paddingBlock: "24px", marginBottom: "100px" }}>
        <Box>
        <Typography gutterBottom variant="h5">Check Logs</Typography>
      </Box>
    <TableContainer sx={{position: "relative"}} component={Paper} >
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell width={"20%"}></TableCell>
            <TableCell>
              <Typography component="h4">Routines</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
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
      </Container>
  );
};

export default Routines