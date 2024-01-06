import { AppBar, BottomNavigation, BottomNavigationAction, Box, Container, Grid, IconButton, Modal, Paper, Toolbar, styled } from '@mui/material'
import { MouseEventHandler, ReactElement, useState } from 'react'

import MenuIcon from '@mui/icons-material/Menu';
import ViewListIcon from '@mui/icons-material/ViewList';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import { isMobile } from 'react-device-detect'; 
import { useAppSelector } from '../redux/hooks';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import HistoryIcon from '@mui/icons-material/History';
import LoginIcon from '@mui/icons-material/Login';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EqualizerIcon from '@mui/icons-material/Equalizer';

import { PATHNAMES } from "../utils/pathnames";
import { selectIsLoggedIn } from '../redux/slices/authSlice';


interface INavItem {
  appRoute: string;
  icon: ReactElement<any, any>;
  name?: string;
  clickHandler?: MouseEventHandler;
}

const beforeSignin: INavItem[] = [
  { appRoute: PATHNAMES.SIGNIN, icon: <DashboardIcon /> },
  { appRoute: PATHNAMES.SIGNIN, icon: <HistoryIcon /> },
  { appRoute: PATHNAMES.SIGNIN, icon: <PersonIcon /> },
  { appRoute: PATHNAMES.SIGNIN, icon: <LoginIcon /> },
];

const afterSignin: INavItem[] = [
  { appRoute: PATHNAMES.USER_HOME, icon: <DashboardIcon /> },
  { appRoute: PATHNAMES.USER_METRICS, icon: <EqualizerIcon /> },
  { appRoute: PATHNAMES.USER_ACCOUNT_EDIT, icon: <PersonIcon /> },
  { appRoute: PATHNAMES.HOME, icon: <LogoutIcon /> },
];

//TODO: get isLoggedIn from redux
//TODO: define a clickHandler in another appropriate component and export to this one
//TODO: get isLoggedIn from redux

const NavBar = () => {
  
  const [open, setOpen] = useState(false);
  // const navigate = useNavigate();
    // const {isLoggedIn, username} = useAppSelector(state => {
    // return state.persistedReducer.user;
  // });
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  // const location = useLocation();
  return (
    <Paper component={"nav"} elevation={3}>
      (
        <AppBar component={"div"}>
          <Toolbar>
            <IconButton key={"open drawer"} color="inherit" aria-label="open drawer">
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
          {isLoggedIn &&
            <IconButton color="inherit">
              <ViewListIcon />
            </IconButton>}
          
              {isLoggedIn
                ? afterSignin.map((as,i) => {console.log(as.appRoute+i); return (<Link to={as.appRoute}>
                  <IconButton color="inherit" sx={{color:"white"}} key={as.appRoute+i}>
                    {as.icon}
                  </IconButton>  
                </Link>)})  
            : beforeSignin.map((bs, i) => {
              console.log(bs.appRoute+i+bs.name);  return (<Link to={bs.appRoute}>
                  <IconButton color="inherit" sx={{color:"white"}} href={bs.appRoute} key={bs.appRoute+i}>
                    {bs.icon}
                  </IconButton>  
                </Link>)})  
            }
            
            <IconButton key={"more"} color="inherit">
              <MoreIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )
      {/* {isMobile ? (
        <BottomNavigation showLabels>
            {isLoggedIn
                ? afterSignin.map((as, i) => (<>
                  <IconButton color="inherit" href={as.appRoute} key={as.appRoute+i}>
                    {as.icon}
                  </IconButton>  
                </>))  
                : beforeSignin.map((as, i) => (<>
                  <IconButton color="inherit" href={as.appRoute} key={as.appRoute+i}>
                    {as.icon}
                  </IconButton>  
                </>))  
            }
        </BottomNavigation>
      ) : } */}
    </Paper>
  )
}

export default NavBar