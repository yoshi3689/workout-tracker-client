import { AppBar, BottomNavigation, BottomNavigationAction, Box, Container, Grid, IconButton, Modal, Paper, Toolbar, styled } from '@mui/material'
import { MouseEventHandler, ReactElement, useState } from 'react'

import MenuIcon from '@mui/icons-material/Menu';
import ViewListIcon from '@mui/icons-material/ViewList';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import { isMobile } from 'react-device-detect'; 
import { useAppSelector } from '../../redux/hooks';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import HistoryIcon from '@mui/icons-material/History';
import LoginIcon from '@mui/icons-material/Login';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EqualizerIcon from '@mui/icons-material/Equalizer';

import { PATHNAMES, defineUserPath } from "../../utils/pathnames";
import { selectIsLoggedIn } from '../../redux/slices/authSlice';
import useAuth from '../../hooks/useAuth';


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
  { appRoute: PATHNAMES.USER_HOME, icon: <ViewListIcon />  },
  { appRoute: PATHNAMES.USER_METRICS, icon: <EqualizerIcon /> },
  // { appRoute: PATHNAMES.USER_ACCOUNT_EDIT, icon: <PersonIcon /> },
  { appRoute: PATHNAMES.HOME, icon: <LogoutIcon /> },
];

const NavBar = () => {
  const { username } = useAuth();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const navigationContents = isLoggedIn
    ? afterSignin.map((as, i) => {
      return (
        <Link to={defineUserPath(username, as.appRoute)}>
          <IconButton color="inherit" sx={{ color: "white" }} key={as.appRoute + i}>
            {as.icon}
          </IconButton>
        </Link>
      )
    })
    : beforeSignin.map((bs, i) => {
      return (<Link to={defineUserPath(username, bs.appRoute)}>
        <IconButton color="inherit" sx={{ color: "white" }} key={bs.appRoute + i}>
          {bs.icon}
        </IconButton>
      </Link>)
    })  
  return (
    <Paper component={"nav"} elevation={3}>
      {!isMobile && (
        <AppBar component={"div"} key={username+isLoggedIn}>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }} />
            { navigationContents }
          </Toolbar>
        </AppBar>
      )}
      {isMobile && (
        <BottomNavigation showLabels>
          { navigationContents }
        </BottomNavigation>
      )}
    </Paper>
  )
}

export default NavBar