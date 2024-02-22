import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import DashboardFooter from "../DashboardFooter/DashboardFooter";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AddPieceDialog from "../AddPieceDialog/AddPieceDialog";

function Dashboard() {
    const dispatch = useDispatch();
    const history = useHistory();
    const username = useSelector(store => store.user.username);
    const pieces = useSelector(store => store.pieces);

    const [addPieceIsOpen, setAddPieceIsOpen] = useState(false);

    const closeAddPiece = () => setAddPieceIsOpen(false);

    const goToPiecePlans = (e) => {
        history.push(`/${e.target.dataset.pieceid}/practice_entries`);
        dispatch({ type: "SET_SELECTED_PIECE", payload: { id: parseInt(e.target.dataset.pieceid), title: e.target.dataset.piecetitle } });
    }

    useEffect(() => {
        dispatch({ type: "FETCH_PIECES" });
    }, []);

    return (
        <>
            <h1>Welcome to the Dashboard, {username}!</h1>
            {pieces.map(piece => (
                <div className="piece-icon" key={piece.id} data-pieceid={piece.id} data-piecetitle={piece.title} onClick={goToPiecePlans}>
                    <p data-pieceid={piece.id} data-piecetitle={piece.title}>{piece.title}</p>
                    <p data-pieceid={piece.id} data-piecetitle={piece.title}>{piece.composer}</p>
                </div>
            ))}
            <button onClick={() => setAddPieceIsOpen(true)}>Add a New Piece Here!</button>
            <AddPieceDialog open={addPieceIsOpen} closeAddPiece={closeAddPiece} />
            <DashboardFooter />
        </>
    );
}
export default Dashboard;