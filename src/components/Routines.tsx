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

const Routines: React.FC = () => {
  const routines = useAppSelector(state => state.persistedReducer.routines)
  
  return (
    <TableContainer component={Paper} style={{ maxWidth: "500px" }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              <Typography component="h4">Routines</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {routines && routines.map((routine) => (
                <RoutineRow
                  key={routine.name}
                  routine={routine}
                  isNew={false}
                ></RoutineRow>
            ))
            }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Routines