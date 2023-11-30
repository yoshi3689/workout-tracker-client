import React, { useState } from 'react'

import { ISet, addSet, setSkelton } from "../redux/slices/setsSlice";

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

const SetRows: React.FC<{exerciseId: string}> = ({exerciseId}) => {
  const [setId, setSetId] = useState<string>("");

  const dispatch = useAppDispatch();

  const sets: ISet[] = useAppSelector(state => Object.values(state.persistedReducer.sets).filter(s => s.exerciseId === exerciseId));

  // add new set
  const handleAdd = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const newSetId = generateObjectId();
    setSetId(newSetId);
    dispatch(addSet({...setSkelton, _id: newSetId, exerciseId}));
  }

  return (
    <>
      <TableRow>
        <TableCell>
          <Box display="flex" alignItems="center">
            <Typography component="h3">Sets</Typography>
          <IconButton color="primary" onClick={handleAdd}>
              <AddCircleIcon />
            </IconButton>
          </Box>
          </TableCell>
          <TableCell>
          </TableCell>
        </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, borderBottom: "none" }}
          colSpan={4}
          scope="row"
        >
        {sets && (
          <Collapse in={true} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="purchases">
              
              <TableBody>
                <TableRow>
                  <TableCell style={{borderBottom: "none"}}>
                    <Grid container>
                      <Grid item>
                        {sets.map((set, i) => (
                          <SetRow
                            key={"" + i + set._id+exerciseId}
                            index={i}
                            set={set}
                          />
                          ))
                        }
                        <Grid
                          item
                          display={"flex"}
                          style={{ justifyContent: "end" }}
                        >
                        </Grid>
                      </Grid>
                    </Grid>
                  </TableCell>
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