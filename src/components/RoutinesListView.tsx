import React from 'react'
import RoutineRow from './RoutineRow';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { IRoutine } from '../redux/slices/routineSlice';

const RoutinesListView: React.FC<{routines: IRoutine[], navigateToLog: Function}> = ({ routines, navigateToLog }) => {
  return (
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
  )
}

export default RoutinesListView