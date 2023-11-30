import React from "react";

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


const SetRow: React.FC<{ set: ISet, index: number }> = ({ set, index }) => {
  const dispatch = useAppDispatch();
  
  const handleDelete = () => {
    dispatch(deleteSet(set._id));
  }

  return (
    <Box display="flex" alignItems="end" className={`set`}>
      <Box >
        <Typography gutterBottom >
          {index+1}
        </Typography>
      </Box>
      <SetEdit set={set} />
      <Box>
        <IconButton
        className="mt-1"
        color="secondary"
        onClick={handleDelete}
      >
        <ClearIcon />
      </IconButton>
      </Box>
    </Box>
  );
};

export default SetRow