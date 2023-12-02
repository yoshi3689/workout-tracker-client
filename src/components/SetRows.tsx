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

import { generateObjectId } from '../utils/idGenerator';
import { IExercise, editExercise } from '../redux/slices/exerciseSlice';

const SetRows: React.FC<{exerciseId: string}> = ({exerciseId}) => {

  const dispatch = useAppDispatch();

  const sets: Record<string, ISet> = useAppSelector(state => state.persistedReducer.sets[exerciseId]);
  console.log(sets);
  // add new set
  const handleAdd = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(addSet({
      set: {
        ...setSkelton
      },
      exerciseId
    }));
  }

  return (
    <>
      <TableHead component={"tr"} >
        <TableCell colSpan={10} >
          <Typography component="h3">Sets</Typography>
        </TableCell>
        <IconButton color="primary" onClick={handleAdd}>
          <AddCircleIcon />
        </IconButton>
      </TableHead>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, borderBottom: "none" }}
          colSpan={4}
          scope="row"
        >
        {sets && (
          <Collapse in={true} timeout="auto" unmountOnExit>
            <Table aria-label="purchases">
              <TableBody>
                <TableRow>
                  {Object.values(sets).map((set, i) => (
                          <SetRow
                            key={"" + i + set._id + exerciseId}
                            exerciseId={exerciseId}
                            index={i}
                            set={set}
                          />
                          ))
                        }
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>  
        )}
        </TableCell>
      </TableRow>
    </>
  )
}

export default SetRows