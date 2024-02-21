import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function DashboardFooter() {
    const history = useHistory();
    return (
        <>
        <button>Pieces</button>
        <button onClick={() => history.push("/calendar")}>Calendar</button>
        </>
    );
}

export default DashboardFooter;