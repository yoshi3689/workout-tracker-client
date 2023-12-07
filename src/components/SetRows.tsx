import React, { useState } from 'react'

import { ISet, addSet, editSet, setSkelton } from "../redux/slices/setsSlice";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import SetRow from './SetRow';
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { IExercise } from '../redux/slices/exerciseSlice';

const SetRows: React.FC<{ exercise: IExercise, isNew: boolean }> = ({ exercise, isNew }) => {
  
  const dispatch = useAppDispatch();

  let sets = useAppSelector(state => state.persistedReducer.sets[exercise._id]);

  // add new set
  const handleAdd = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(addSet({
      set: {
        ...setSkelton
      },
      exerciseId: exercise._id
    }));
  }

  return (
    <Table size='small'>
      <TableHead>
        <TableRow >
          {isNew && (
            <TableCell width="25%">
            <IconButton color="primary" onClick={handleAdd}>
            <AddCircleIcon />
            </IconButton>
          </TableCell>
          )}
          <TableCell>
            <Typography variant="subtitle1">Sets</Typography>
          </TableCell>
          <TableCell/>
          
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
                      isNew={isNew}
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