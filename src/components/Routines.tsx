import React from 'react'
import { Routine } from '../routes/Root'
import RoutineRow from './RoutineRow';

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
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";


const Routines: React.FC<{ routines: Routine[], setRoutines: Function }> = ({ routines, setRoutines }) => {
  

  return (
    <div>
      <React.Fragment>
        <Table>
          <TableHead>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
              {/* <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell> */}
              <TableCell component="th" scope="row" align="center">
                list of Rutines
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {routines &&
              routines.map((routine) => (
                <TableRow key={routine.name}>
                  <TableCell component="th" scope="row">
                    {routine.name}
                  </TableCell>
                  {/* <TableCell>{routine.customerId}</TableCell>
                      <TableCell align="right">{routine.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(routine.amount * row.price * 100) / 100}
                      </TableCell> */}
                </TableRow>
              ))}
            <TableRow>
              <TableCell component="th" scope="row">
                Hello this is supposed to be routine1
              </TableCell>
              {/* <TableCell>{routine.customerId}</TableCell>
                      <TableCell align="right">{routine.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(routine.amount * row.price * 100) / 100}
                      </TableCell> */}
            </TableRow>
            <TableRow>
              <TableCell
                style={{ paddingBottom: 0, paddingTop: 0 }}
                colSpan={6}
                scope="row"
              >
                This is going to be another row but with a collapsible nested
                table, and represents name of the routine. In this table, we are
                trying to display name of exercise and the collapse button
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
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell
                            style={{ paddingBottom: 0, paddingTop: 0 }}
                            colSpan={6}
                            scope="row"
                          >
                            This is going to be another row but with a
                            collapsible nested table, and represents name of the
                            exercise. Collapsible table for displaying each set
                            as a row
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
                                      <TableCell align="right">
                                        Amount
                                      </TableCell>
                                      <TableCell align="right">
                                        Total price ($)
                                      </TableCell>
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
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </React.Fragment>
    </div>
  );
};

export default Routines