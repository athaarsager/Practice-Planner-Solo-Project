import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function DashboardFooter() {
    const history = useHistory();
    const dispatch = useDispatch();
    const goToCalendar = () => {
        dispatch({ type: "UNSET_TO_DAYVIEW" });
        dispatch({ type: "CLEAR_CALENDAR_DATE_INFO" });
        history.push("/dashboard/calendar");
    }
    return (
        <Box>
            <Button color="secondary" onClick={() => history.push("/dashboard/pieces")}>Pieces</Button>
            <Button color="secondary" onClick={goToCalendar}>Calendar</Button>
        </Box>
    );
}

export default DashboardFooter;