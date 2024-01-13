import React, {ReactElement, useState} from 'react'
import Typography from "@mui/material/Typography";

import CircleIcon from '@mui/icons-material/Circle';
import TuneIcon from '@mui/icons-material/Tune';

import { useAppSelector } from '../../redux/hooks';
import { Box, Button, Collapse, CssBaseline, IconButton, Link, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { colors } from '../../utils/useColors';
import RoutinesListView from './RoutinesListView';
import { muscleGroups } from '../../utils/filterByBodyPart';
import useAuth from '../../hooks/useAuth';
import { selectRoutineTemplate } from '../../redux/slices/routineTemplateSlice';
import { useRoutineFilters } from '../../hooks/routine/useRoutineFilters';
import { useFillLog } from '../../hooks/routine/useFillLog';
import { adoptForPagination } from '../../utils/paginationAdapter';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PATHNAMES, defineUserPath } from '../../utils/pathnames';

export const Dot = (bodyPart: string, createdAt: string) => (
  <CircleIcon key={bodyPart+createdAt} sx={{ color: colors[bodyPart], height: "10px", width: "10px" }} />
)

const Routines: React.FC<{titleTextElement: ReactElement, onSelectCallBack?: Function}> = ({ titleTextElement, onSelectCallBack }) => {
  const routines = useAppSelector(state => state.persistedReducer.routines)
  const routineId = useAppSelector(selectRoutineTemplate);

  const { controlledRoutines, filters, handleFilterChange } = useRoutineFilters(routines);

  const { username } = useAuth();
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const { handleSubmit } = useFillLog(
    username,
    routines.find(r => r._id === routineId),
    onSelectCallBack,
  );

  const [open, setOpen] = useState(true);
  
  return (
        <>
        <Box>
          <Box display={"flex"} alignItems="center" >
            {titleTextElement}
            <IconButton onClick={() => setOpen(!open)}><TuneIcon /></IconButton>
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
      {routines.length > 0 ? (
        <Box sx={{overflow: "hidden", overflowY: "scroll", height: "70%", mt: 2, paddingInline: "2px"}}>
          <RoutinesListView
            routines={filters.length > 0
              ? adoptForPagination(Array.from(controlledRoutines))
              : adoptForPagination(routines)}
          />
        </Box>
      ) : (
          <>
            <Typography variant='h6' sx={{mt: 4}}>
              No logs to show. 
            </Typography>
            {!pathname.includes(`${username}/log`) && (
              <Typography variant='h6'>
                Please log your workout 
                <Link
                  onClick={() => navigate(defineUserPath(username, PATHNAMES.USER_EDIT_ADD_LOG))}
                  sx={{ cursor: "pointer" }}
                  > here</Link>
            </Typography>    
          )}
          </>
      )
      }
    </>
    );
};

export default Routines