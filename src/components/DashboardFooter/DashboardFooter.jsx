import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Button from "@mui/material/Button";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Box from "@mui/material/Box";

function DashboardFooter() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [value, setValue] = useState(0);
    const goToCalendar = () => {
        dispatch({ type: "UNSET_TO_DAYVIEW" });
        dispatch({ type: "CLEAR_CALENDAR_DATE_INFO" });
        history.push("/dashboard/calendar");
    }
    return (
        <Box sx={{ mb: 2 }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                > 
                <BottomNavigationAction label="Dashboard" icon={<RestoreIcon />} />
                <BottomNavigationAction label="Calendar" icon={<FavoriteIcon />} />
                <BottomNavigationAction label="Login" icon={<LocationOnIcon />} />
                <Button color="secondary" onClick={() => history.push("/dashboard/pieces")}>Dashboard</Button>
                <Button color="secondary" onClick={goToCalendar}>Calendar</Button>
            </BottomNavigation>
        </Box>
    );
}

export default DashboardFooter;