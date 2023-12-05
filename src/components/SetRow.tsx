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


const SetRow: React.FC<{ set: ISet, index: number, exerciseId: string }> = ({ set, index, exerciseId }) => {
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
      <TableCell>
        <Typography sx={{textAlign:"center"}} gutterBottom >
          {index+1}
        </Typography>
      </TableCell>
      <SetEdit exerciseId={exerciseId} set={set} />
      {!isMobile && <><TableCell /><TableCell /></>}
      <TableCell sx={{paddingInline: 0}} >
        <IconButton
        className="mt-1"
        color="secondary"
        onClick={handleDelete}
      >
        <ClearIcon />
      </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default SetRow