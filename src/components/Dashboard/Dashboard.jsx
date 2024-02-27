import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import DashboardFooter from "../DashboardFooter/DashboardFooter";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AddPieceDialog from "../AddPieceDialog/AddPieceDialog";
import Swal from "sweetalert2";

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

    const deletePiece = (e) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({ type: "DELETE_PIECE", payload: e.target.dataset.pieceid });
                Swal.fire({
                    title: "Deleted!",
                    text: "Piece deleted.",
                    icon: "success"
                });
            }
        });

    }

    useEffect(() => {
        dispatch({ type: "FETCH_PIECES" });
    }, []);

    return (
        <>
            <h1>Welcome to the Dashboard, {username}!</h1>
            {pieces.map(piece => (
                <>
                    <div className="piece-icon" key={piece.id} data-pieceid={piece.id} data-piecetitle={piece.title} onClick={goToPiecePlans}>
                        <p data-pieceid={piece.id} data-piecetitle={piece.title}>{piece.title}</p>
                        <p data-pieceid={piece.id} data-piecetitle={piece.title}>{piece.composer}</p>
                    </div>
                    <button data-pieceid={piece.id} onClick={deletePiece}>Delete Piece</button><br />
                </>
            ))}
            <button onClick={() => setAddPieceIsOpen(true)}>Add a New Piece Here!</button>
            <AddPieceDialog open={addPieceIsOpen} closeAddPiece={closeAddPiece} />
            <DashboardFooter />
        </>
    );
}
export default Dashboard;