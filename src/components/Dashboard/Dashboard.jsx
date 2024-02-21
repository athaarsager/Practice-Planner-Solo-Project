import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import DashboardFooter from "../DashboardFooter/DashboardFooter";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Dashboard() {
    const dispatch = useDispatch();
    const history = useHistory();
    const username = useSelector(store => store.user.username);
    const pieces = useSelector(store => store.pieces);

    useEffect(() => {
        dispatch({ type: "FETCH_PIECES" });
    }, []);

    return (
        <>
            <h1>Welcome to the Dashboard, {username}!</h1>
            {pieces.map(piece => (
                <div className="piece-icon" key={piece.id} data-pieceid={piece.id} onClick={(e) => history.push(`/${e.target.dataset.pieceid}/practice_entries`)}>
                    <p data-pieceid={piece.id}>{piece.title}</p>
                    <p data-pieceid={piece.id}>{piece.composer}</p>
                </div>
            ))}
            <button>Add a New Piece Here!</button>

            <DashboardFooter />
        </>
    );
}
export default Dashboard;