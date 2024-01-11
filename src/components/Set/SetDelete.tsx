import React from "react";

import { ISet, deleteSet } from '../../redux/slices/setsSlice';
import { useAppDispatch } from "../../redux/hooks";

import Typography from "@mui/material/Typography";

import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import SetEdit from "./SetEdit";
import { TableCell, TableRow } from "@mui/material";

import { isMobile } from "react-device-detect";

import { useDeleteSet } from "../../hooks/set/useDeleteSet";

const SetDelete: React.FC<{ set: ISet, index: number, exerciseId: string }>
  = ({ set, index, exerciseId }) => {
  const [handleDelete] = useDeleteSet(set._id, exerciseId);

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

export default SetDelete