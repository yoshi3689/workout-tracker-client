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
      <TableCell className={iconSetCell} width="20%">
        {isNew ?
        <IconButton
          className="mt-1"
          color="error"
          onClick={handleDelete}
          size="small"  
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