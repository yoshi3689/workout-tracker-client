import React, { useEffect, useState } from "react";

import { ISet, deleteSet } from '../redux/slices/setsSlice';
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import SetEdit from "./SetEdit";
import { TableCell, TableRow } from "@mui/material";


const SetRow: React.FC<{ set: ISet, index: number, exerciseId: string, isNew: boolean }> = ({ set, index, exerciseId, isNew }) => {
  const dispatch = useAppDispatch();
  
  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
      setWidth(window.innerWidth);
  }
  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  const isMobile = width <= 768;

  const handleDelete = () => {
    dispatch(deleteSet({setId: set._id, exerciseId}));
  }

  return (
    <TableRow >
      <TableCell width={"25%"}>
        {isNew ?
        <IconButton
        className="mt-1"
        color="error"
        onClick={handleDelete}
      >
        <ClearIcon />
          </IconButton>
          : <Typography alignSelf={"center"}>{index}</Typography>
        }
        
      </TableCell>
      {isNew ?
        <SetEdit exerciseId={exerciseId} set={set} />
        : <TableCell>
          <TableCell>
              <FormControl>
                <Input disabled={true} value={set.rep} />
              </FormControl>
              <FormControl>
                <Input disabled={true} value={set.rest} />
              </FormControl>
              <FormControl>
                <Input disabled={true} value={set.weight} />
              </FormControl>
            </TableCell>
        </TableCell>
      }
      {!isMobile && <><TableCell /><TableCell /></>}
    </TableRow>
  );
};

export default SetRow