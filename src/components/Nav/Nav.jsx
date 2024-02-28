import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';

function Nav() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const goToCalendar = () => {
    dispatch({ type: "UNSET_TO_DAYVIEW" });
    dispatch({ type: "CLEAR_CALENDAR_DATE_INFO" });
    history.push("/dashboard/calendar");
  }

  return (
    <Box className="nav">
      <Link to="/home">
        <Typography variant="h5" className="nav-title">Practice Planner</Typography>
      </Link>
      <Box>
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
