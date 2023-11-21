import React from 'react'

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import RoutineRow from './RoutineRow';
import { IRoutine } from "../redux/slices/routineSlice";

const RoutineCreate: React.FC<{ routine:IRoutine  }> = ({ routine }) => {
  return (
    <TableContainer component={Paper} style={{ maxWidth: "500px" }}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  
                </TableCell>
              </TableRow>
            </TableHead>
                  <TableBody>
                    <RoutineRow
                  key={routine.name}
                  routine={routine}
                  isNew={false}
                />
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default RoutineCreate