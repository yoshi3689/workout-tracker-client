import React, { useState } from 'react'
import RoutineRow from './RoutineRow';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { IRoutine } from '../../redux/slices/routineSlice';
import { Typography } from '@mui/material';

import PaginationBar from '../Pagination/PaginationBar';

const RoutinesListView: React.FC<{ routines: IRoutine[][] }> = ({ routines }) => {
  const [page, setPage] = useState(1);
  return (
    routines ? ( 
      <>
        <PaginationBar setPage={setPage} pageLength={routines.length} />
        <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableBody>
            {(
              routines.length > 0 && routines[page - 1]?.map((r) => (
                <RoutineRow
                  key={r._id}
                  routine={r}
                ></RoutineRow>
              ))
            )}
            </TableBody>
          </Table>
          </TableContainer> 
      </>    
    )
    : (<Typography>No Entries Found</Typography>)  
  )
}

export default RoutinesListView