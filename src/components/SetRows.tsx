import React, { useState, useEffect } from 'react'

import { ISet, addSet } from "../redux/slices/setsSlice";

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
import { editCurrentRoutine } from '../redux/slices/currentRoutineSlice';

const SetRows: React.FC<{exercise: IExercise}> = ({exercise}) => {
  const [currentSets, setCurrentSets] = useState<ISet[]>(exercise.sets);
  const dispatch = useAppDispatch();
  const routine = useAppSelector(state => {
    return state.persistedReducer.currentRoutine;
  });

  const handleAdd = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const setSkelton = {
      _id: currentSets.length+1+"",
      rep: 0,
      rest: 0,
      weight: 0,
    }
    setCurrentSets([setSkelton, ...currentSets])
  }

  useEffect(() => {
    let tempExercises: IExercise[] = routine.exercises.map((e) => {
      if (e._id === exercise._id)
        return {
          ...exercise, sets: currentSets
        };
      else return e;
    });
    console.log(tempExercises, routine.exercises);
    dispatch(editCurrentRoutine({
      ...routine,
      exercises: [...tempExercises]
    }));
    // console.log(tempExercises)
  }, [currentSets]);
  return (
    <>
      <TableRow>
          <TableCell></TableCell>
          <TableCell>Sets</TableCell>
          <TableCell></TableCell>
          <TableCell>
            <IconButton color="primary" onClick={handleAdd}>
              <AddCircleIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
          scope="row"
        >
          <Collapse in={true} timeout="auto" unmountOnExit>
            <Typography variant="h6" gutterBottom component="div"></Typography>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>

                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Grid container>
                      <Grid item>
                        {currentSets.map((set, i) => (
                          <SetRow
                            key={"" + i + set._id}
                            exercise={exercise}
                            set={set}
                          />
                        ))}
                        <Grid
                          item
                          display={"flex"}
                          style={{ justifyContent: "end" }}
                        >
                          {/* <IconButton color="primary" onClick={handleAdd}>
                            <AddCircleIcon />
                          </IconButton> */}
                        </Grid>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default SetRows