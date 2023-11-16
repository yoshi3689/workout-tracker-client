import React from 'react'
// import { Exercise, Set } from "../routes/Root"
import { IExercise } from '../redux/slices/exerciseSlice';
import { ISet } from '../redux/slices/setsSlice';

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

const SetRow: React.FC<{ setExercise: Function; exercise: IExercise, set: ISet }> = ({
  setExercise,
  exercise,
  set
}) => {
  return (
    <>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
          scope="row"
        >
          This is going to be another row but with a collapsible nested table,
          and represents name of the exercise. Collapsible table for displaying
          each set as a row
          <Collapse in={true} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
              ></Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <div className="row">
        <label htmlFor="reps">reps</label>

        <input type="number" name="reps" id="reps" />
        <label htmlFor="rest">rest</label>

        <input type="number" name="rest" id="rest" />

        <label htmlFor="weight">weight</label>
        <input type="number" name="weight" id="weight" />
        <button>---Remove Set</button>
      </div>
    </>
  );
};

export default SetRow