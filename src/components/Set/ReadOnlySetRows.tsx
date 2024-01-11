import React from 'react'
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Typography from "@mui/material/Typography";
import { ISet } from '../../redux/slices/setsSlice';

const ReadOnlySetRows: React.FC<{ sets: ISet[] }> = ({ sets}) => {
  return (
    <Table>
          <TableHead>
            <TableRow>
              <TableCell>   
              </TableCell>
              <TableCell>
                lbs
              </TableCell>
              <TableCell>
                rep
              </TableCell>
              <TableCell>
                rest
              </TableCell>
            </TableRow>      
          </TableHead>
        <TableBody>
            {sets.map((set,i) => (
              <TableRow key={set._id}>
                <TableCell>
                  {i+1}
                </TableCell>
              <TableCell>
                {set.weight}
              </TableCell>
              <TableCell>
                {set.rep}
              </TableCell>
              <TableCell>
                {set.rest}
              </TableCell>
              </TableRow>  
            ))}    
          </TableBody>
                </Table>  
  )
}

export default ReadOnlySetRows