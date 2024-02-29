import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

function Nav() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  }

  const goToCalendar = () => {
    dispatch({ type: "UNSET_TO_DAYVIEW" });
    dispatch({ type: "CLEAR_CALENDAR_DATE_INFO" });
    history.push("/dashboard/calendar");
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      {/* If no user is logged in, show these links */}
      {!user.id && (
        // If there's no user, show login/registration links
        <Link className="navLink" to="/login">
          Login / Register
        </Link>
      )}
      {user.id &&
        <List>
          {["Pieces", "Calendar"].map((text, index) => (
            <Link to={`/dashboard/${text}`}>
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
          <LogOutButton className="navLink" />
        </List>
      }
    </Box>
  );

  return (
    <Box className="nav">
      <Typography variant="h5" className="nav-title">Practice Planner</Typography>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer(true)}>
          <MenuIcon sx={{ color: "#f7f7f7"}} />
        </IconButton>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </Box>
      <Box sx={{ display: {xs: "none", md: "block"}}}>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/dashboard/pieces">
              Dashboard
            </Link>

            <NavLink className="navLink" onClick={goToCalendar} to="/dashboard/calendar">
              Calendar
            </NavLink>

            <LogOutButton className="navLink" />
          </>
        )}

      </Box>
    </Box>
  );
}

export default Nav;
