import React, { ReactElement } from 'react'

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { IExercise } from '../../redux/slices/exerciseSlice';

import { Collapse } from '@mui/material';
import { isMobile } from 'react-device-detect';

const iconCell = "iconCell";

// represent a Exercise containing info such as 
// exercise, total reps, sets and etc
const ExerciseRow: React.FC<{ exercise: IExercise, rowContent: ReactElement, rowAction?: ReactElement, collapsibleContent: ReactElement, }> = ({ exercise, rowContent, rowAction, collapsibleContent, }) => {
  const [open, setOpen] = React.useState(true);
  return (
    <>
      <TableRow onClick={() => setOpen(!open)} sx={{ "& > *": { borderBottom: "unset" }, position: "relative", cursor: "pointer" }} selected={open}>
        <TableCell align='left'>
          <Box display={"flex"} alignItems="center" >
            <IconButton size='small' onClick={() => setOpen(!open)} >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            {rowContent}
          </Box>
        </TableCell>
        <TableCell align='right' className={iconCell}>
          {rowAction}
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell colSpan={2} sx={{ padding: 0 }}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {collapsibleContent}
        </Collapse>
      </TableCell>  
    </TableRow>
    </>
  );
};

export default ExerciseRow;