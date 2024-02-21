import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function DashboardFooter() {
    const history = useHistory();
    return (
        <>
        <button onClick={() => history.push("/dashboard/pieces")}>Pieces</button>
        <button onClick={() => history.push("/dashboard/calendar")}>Calendar</button>
        </>
    );
}

export default DashboardFooter;