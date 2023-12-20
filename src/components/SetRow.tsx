import React from "react";

import { ISet, deleteSet } from '../redux/slices/setsSlice';
import { useAppDispatch } from "../redux/hooks";

import Typography from "@mui/material/Typography";

import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import SetEdit from "./SetEdit";
import { TableCell, TableRow } from "@mui/material";

import { isMobile } from "react-device-detect";
import "../styles/tableCell.css"

const iconSetCell = "iconSetCell"

const SetRow: React.FC<{ set: ISet, index: number, exerciseId: string, isNew: boolean }> = ({ set, index, exerciseId, isNew }) => {
  const dispatch = useAppDispatch();
  
  const handleDelete = () => {
    dispatch(deleteSet({setId: set._id, exerciseId}));
  }

  return (
    <TableRow >
      <TableCell align="center" >
        <Typography marginLeft="4px" height={1} >{index+1}</Typography>
      </TableCell>
      <SetEdit exerciseId={exerciseId} set={set} />
      <TableCell align="right">
        <IconButton
          className="mt-1"
          color="error"
          onClick={handleDelete}
          size="small"  
      >
        <ClearIcon />
          </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default SetRow