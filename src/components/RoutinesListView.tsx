import React from 'react'
import RoutineRow from './RoutineRow';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { IRoutine } from '../redux/slices/routineSlice';
import { useLocation } from 'react-router-dom';

const RoutinesListView: React.FC<{ routines: IRoutine[] }> = ({ routines }) => {
  const location = useLocation();
  const pathnamInSegments = location.pathname.split("/")
  const [selectedValue, setSelectedValue] = React.useState("");
  const isRadioButton = pathnamInSegments[pathnamInSegments.length - 1] === "log";
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    console.log(event.target.value)
    setSelectedValue(event.target.value);
  }
  return (
    <TableContainer component={Paper} >
      <Table aria-label="collapsible table">
        <TableBody>
          {routines && routines.map((routine) => (
            <RoutineRow
              isRadioButton={isRadioButton}
              selectedValue={selectedValue}
              handleRadioChange={handleRadioChange}
              key={routine._id}
              routine={routine}
              isNew={false}
            ></RoutineRow>
            ))
            }
          </TableBody>
        </Table>
        </TableContainer>
  )
}

export default RoutinesListView