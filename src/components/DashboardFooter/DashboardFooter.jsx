import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { useState } from "react";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { FeaturedPlayListOutlined } from "@mui/icons-material";
import { CalendarMonthOutlined } from "@mui/icons-material";
import Box from "@mui/material/Box";
import { Link as RouterLink, HashRouter as Router } from "react-router-dom";



function DashboardFooter() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [value, setValue] = useState(0);
    const goToCalendar = () => {
        dispatch({ type: "UNSET_TO_DAYVIEW" });
        dispatch({ type: "CLEAR_CALENDAR_DATE_INFO" });
    }
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
                <BottomNavigationAction component={RouterLink} value="/dashboard/pieces" to="/dashboard/pieces" label="Dashboard" icon={<FeaturedPlayListOutlined />} />
                <BottomNavigationAction onClick={goToCalendar} component={RouterLink} value="/dashboard/calendar" to="/dashboard/calendar" label="Calendar" icon={<CalendarMonthOutlined />} />
            </BottomNavigation>
            </Router>
        </Box>
    );
}

export default DashboardFooter;