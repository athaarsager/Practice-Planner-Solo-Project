import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";

function DashboardFooter() {
    const history = useHistory();
    const dispatch = useDispatch();
    const goToCalendar = () => {
        dispatch({ type: "UNSET_TO_DAYVIEW" });
        dispatch({ type: "CLEAR_CALENDAR_DATE_INFO" });
        history.push("/dashboard/calendar");
    }
    return (
        <>
        <button onClick={() => history.push("/dashboard/pieces")}>Pieces</button>
        <button onClick={goToCalendar}>Calendar</button>
        </>
    );
}

export default DashboardFooter;