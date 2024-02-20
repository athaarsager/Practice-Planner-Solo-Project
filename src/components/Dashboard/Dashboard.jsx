import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import DashboardFooter from "../DashboardFooter/DashboardFooter";

function Dashboard() {
    const dispatch = useDispatch();
    const username = useSelector(store => store.user.username);
    const pieces = useSelector(store => store.pieces);

    useEffect(() => {
        dispatch({ type: "FETCH_PIECES" });
    }, []);

    return (
        <>
            <h1>Welcome to the Dashboard, {username}!</h1>
            {pieces.map(piece => (
                <div className="piece-icon" key={piece.id}>
                    <p>{piece.title}</p>
                    <p>{piece.composer}</p>
                </div>
            ))}
            <button>Add a New Piece Here!</button>

            <DashboardFooter />
        </>
    );
}
export default Dashboard;