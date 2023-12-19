import React, { useState } from 'react'

import { ISet, addSet, editSet, setSkelton } from "../redux/slices/setsSlice";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import SetRow from './SetRow';
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { IExercise } from '../redux/slices/exerciseSlice';

const iconCell = "iconCell"
const cellNoILPadding = "cellNoILPadding";

const SetRows: React.FC<{ exercise: IExercise, isNew: boolean }> = ({ exercise, isNew }) => {
  
  const dispatch = useAppDispatch();

  let sets = useAppSelector(state => state.persistedReducer.sets[exercise._id]);

  // add new set
  const handleAdd = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const setArr = Object.values(sets);
    const setArrLen = setArr.length;

    dispatch(addSet({
      set: {
        ...setArr[setArrLen-1]
      },
      exerciseId: exercise._id
    }));
  }

  return (
    <Table size='small'>
      <TableHead>
        <TableRow >
          {isNew && (
            <TableCell className={iconCell}>
            <IconButton size='small' color="primary" onClick={handleAdd}>
            <AddIcon />
            </IconButton>
          </TableCell>
          )}
          <TableCell className={cellNoILPadding}>
            <Typography variant="subtitle1">Sets</Typography>
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