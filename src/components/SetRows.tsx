import React from 'react'

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

import SetRow from './SetRow';
import { useAppSelector } from "../redux/hooks";
import { IExercise } from '../redux/slices/exerciseSlice';
import { isMobile } from 'react-device-detect';
import { useAddSet } from '../hooks/set/useAddSet';

const SetRows: React.FC<{ exercise: IExercise, isNew: boolean }> = ({ exercise, isNew }) => {

  let sets = useAppSelector(state => state.persistedReducer.sets[exercise._id]);
  const [handleAdd] = useAddSet(sets, exercise._id);

  return (
    <Table size='small'>
      <TableHead>
        <TableRow >
          <TableCell align='left'>
            <Typography variant="subtitle1">Sets</Typography>
          </TableCell>
            <TableCell align='right'>
            <IconButton size='small' color="primary" onClick={handleAdd}>
            <AddIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
        <TableCell
            style={{ padding: 0, borderBottom: "none" }}
            colSpan={3}
          >
            <Table size="small">
              <TableBody>
                {isNew && Object.values(sets).map((set, i) => (
                    <SetRow
                      key={"" + i + set._id + exercise._id}
                      exerciseId={exercise._id}
                      index={i}
                      set={set}
                    />
                   ))
                  }
              </TableBody>
            </Table>
        </TableCell>
      </TableRow>
      </TableBody>
    </Table>
  )
}

export default SetRows