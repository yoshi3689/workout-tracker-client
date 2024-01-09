import React from 'react'
import RoutineRow from './RoutineRow';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { IRoutine } from '../redux/slices/routineSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { editNewRoutine } from '../redux/slices/newRoutineSlice';
import { selectRoutineTemplate } from '../redux/slices/routineTemplateSlice';
import { IExercise, loadExercises } from '../redux/slices/exerciseSlice';
import { ISet, loadSets } from '../redux/slices/setsSlice';
import useAuth from '../hooks/useAuth';
import { Typography } from '@mui/material';

const RoutinesListView: React.FC<{ routines: IRoutine[] }> = ({ routines }) => {
  return (
    (routines && routines.length === 1) 
    ? ( 
    <TableContainer component={Paper} >
      <Table aria-label="collapsible table">
        <TableBody>
          {(
            routines.map((routine) => (
              <RoutineRow
                key={routine._id}
                routine={routine}
                isNew={false}
              ></RoutineRow>
            ))
          )}
          </TableBody>
        </Table>
        </TableContainer>    
    )
    : (<Typography>No Entries Found</Typography>)  
  )
}

export default RoutinesListView