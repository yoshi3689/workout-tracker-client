import React from 'react'

import { ISet, addSet } from "../redux/slices/setsSlice";
import { useAppDispatch } from "../redux/hooks";

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

const SetRows: React.FC<{ sets: ISet[] }> = ({
  sets
}) => {
  const dispatch = useAppDispatch();

  const handleAdd = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(
      addSet({
        _id: "",
        rep: 0,
        rest: 0,
        weight: 0,
      })
    );
  }
  return (
    <>
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
                <TableRow></TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Grid container>
                      <Grid item>
                        {sets.map((set, i) => (
                          <SetRow
                            key={"" + i + set._id}
                            set={set}
                          />
                        ))}
                        <Grid
                          item
                          display={"flex"}
                          style={{ justifyContent: "end" }}
                        >
                          <IconButton color="primary" onClick={handleAdd}>
                            <AddCircleIcon />
                          </IconButton>
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