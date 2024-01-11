import React, {ReactElement, useState} from 'react'
import Typography from "@mui/material/Typography";

import CircleIcon from '@mui/icons-material/Circle';
import TuneIcon from '@mui/icons-material/Tune';

import { isMobile } from 'react-device-detect'; 
import { useAppSelector } from '../../redux/hooks';
import { Box, Button, Collapse, Container, CssBaseline, IconButton, ToggleButton, ToggleButtonGroup, styled } from '@mui/material';
import { colors } from '../../utils/useColors';
import RoutinesListView from './RoutinesListView';
import { muscleGroups } from '../../utils/filterByBodyPart';
import useAuth from '../../hooks/useAuth';
import { selectRoutineTemplate } from '../../redux/slices/routineTemplateSlice';
import { useRoutineFilters } from '../../hooks/routine/useRoutineFilters';
import { useFillLog } from '../../hooks/routine/useFillLog';

export const Dot = (bodyPart: string, createdAt: string) => (
  <CircleIcon key={bodyPart+createdAt} sx={{ color: colors[bodyPart], height: "10px", width: "10px" }} />
)

const Routines: React.FC<{titleTextElement: ReactElement, onSelectCallBack?: Function}> = ({ titleTextElement, onSelectCallBack }) => {
  const routines = useAppSelector(state => state.persistedReducer.routines)
  const routineId = useAppSelector(selectRoutineTemplate);

  const { controlledRoutines, filters, handleFilterChange } = useRoutineFilters(routines);

  const { username } = useAuth();
  const { handleSubmit } = useFillLog(
    username,
    routines.find(r => r._id === routineId),
    onSelectCallBack,
  );

  const [open, setOpen] = useState(true);
  
  return (
      <>
        <Box>
        <Box>
          <Box display={"flex"} alignItems="center" >
            {titleTextElement}
            <IconButton onClick={() => setOpen(!open)}><TuneIcon /></IconButton>
            <Box>

          </Box>
          </Box>
        </Box>

          <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{marginBottom: "16px",  overflowX:"scroll"}}  >
            <ToggleButtonGroup
              value={filters}
              onChange={handleFilterChange}
            >
            {muscleGroups.map(mg => (
            <ToggleButton value={mg} key={mg} sx={{marginLeft: "4px"}} >
                {Dot(mg, new Date().toDateString())}
              <Typography alignSelf="center" textAlign="center" variant='caption'>
                {mg}
              </Typography>
            </ToggleButton>
          ))}
          </ToggleButtonGroup>
        </Box>
        </Collapse>
          
        <CssBaseline />
        <Box>
          <Button size="small" sx={{mr: 2}} variant="contained" disabled={!routineId ? true : false} onClick={() => handleSubmit(true)}>Use as Template</Button>
          <Button size="small" variant="contained" disabled={!routineId ? true : false} onClick={() => handleSubmit(false)}>Edit</Button>
        </Box>
        </Box>
        <Box sx={{overflow: "hidden", overflowY: "scroll", height: "70%", mt: 2, paddingInline: "2px"}}>
          <RoutinesListView
            routines={filters.length > 0 ? Array.from(controlledRoutines) : routines}
          />
        </Box>

      </>
  );
};

export default Routines