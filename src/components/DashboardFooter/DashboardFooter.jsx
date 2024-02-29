import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { FeaturedPlayListOutlined } from "@mui/icons-material";
import { CalendarMonthOutlined } from "@mui/icons-material";
import Box from "@mui/material/Box";
import { Link as RouterLink, HashRouter as Router } from "react-router-dom";

function DashboardFooter() {
    const history = useHistory();
    const dispatch = useDispatch();

    const location = useLocation(); // use this to keep track of what page we're on, so can set the selected button accordingly

    // This maps routes to the BottomNavigationAction values
    // feels like there should be an easier way than converting to numbers, but this is what ChatGPT gave
    // so not gonna question for the time being...
    const routeToValue = {
        "/dashboard/pieces": 0,
        "/dashboard/calendar": 1
    }

    const [value, setValue] = useState(routeToValue[location.pathname] || 0);

    const goToCalendar = () => {
        dispatch({ type: "UNSET_TO_DAYVIEW" });
        dispatch({ type: "CLEAR_CALENDAR_DATE_INFO" });
    }

    useEffect(() => {
        setValue(routeToValue[location.pathname] || 0);
    }, [location]);
    return (
        <Box sx={{ mb: 2 }}>
            <Router>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                > 
                <BottomNavigationAction component={RouterLink} value={0} to="/dashboard/pieces" label="Pieces" icon={<FeaturedPlayListOutlined />} />
                <BottomNavigationAction onClick={goToCalendar} component={RouterLink} value={1} to="/dashboard/calendar" label="Calendar" icon={<CalendarMonthOutlined />} />
            </BottomNavigation>
            </Router>
        </Box>
    );
}

export default DashboardFooter;