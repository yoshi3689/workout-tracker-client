import { AppBar, BottomNavigation, BottomNavigationAction, Box, Container, Grid, IconButton, Modal, Paper, Toolbar, styled } from '@mui/material'
import { MouseEventHandler, ReactElement, useState } from 'react'

import MenuIcon from '@mui/icons-material/Menu';
import ViewListIcon from '@mui/icons-material/ViewList';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import { isMobile } from 'react-device-detect'; 
import { useAppSelector } from '../redux/hooks';

import { useLocation, useNavigate } from 'react-router-dom';

import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import HistoryIcon from '@mui/icons-material/History';
import LoginIcon from '@mui/icons-material/Login';
import DashboardIcon from '@mui/icons-material/Dashboard';

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
  { appRoute: PATHNAMES.USER_HOME, icon: <HistoryIcon /> },
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
      {isMobile ? (
        <BottomNavigation showLabels>
          <BottomNavigationAction label="Recents" />
          <BottomNavigationAction label="Favorites" />
          <BottomNavigationAction label="Nearby" />
        </BottomNavigation>
      ) : (
        <AppBar >
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer">
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            {isLoggedIn && <IconButton color="inherit">
              <ViewListIcon />
            </IconButton>}
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
            <IconButton color="inherit">
              <MoreIcon />
            </IconButton>
          {/* {isLoggedIn &&
            <IconButton color="inherit">{username}</IconButton>
            } */}
          </Toolbar>
        </AppBar>
      )}
    </Paper>
  )
}

export default NavBar