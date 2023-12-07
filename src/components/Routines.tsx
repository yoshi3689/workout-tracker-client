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

import { useAppSelector } from '../redux/hooks';
import { Box, Container } from '@mui/material';

const Routines: React.FC = () => {
  const routines = useAppSelector(state => state.persistedReducer.routines)
  
  return (
    <Container component={Paper} sx={{ paddingBlock: "24px", marginBottom: "100px" }}>
      <Box>
        <Typography gutterBottom variant="h5">Check Logs</Typography>
      </Box>
    <TableContainer component={Paper} >
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
                ></RoutineRow>
            ))
            }
        </TableBody>
      </Table>
      </TableContainer>
      </Container>
  );
};

export default Routines