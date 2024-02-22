import { useDispatch } from "react-redux";
import { useState } from "react";
function AddPieceDialog({open, closeAddPiece}) {
    const dispatch = useDispatch();

    const [pieceTitle, setPieceTitle] = useState("");
    const [pieceComposer, setPieceComposer] = useState("");

    const addPiece = (e) => {
        e.preventDefault();
        dispatch({ type: "ADD_PIECE", payload: { title: pieceTitle, composer: pieceComposer }});
        setPieceTitle("");
        setPieceComposer("");
        closeAddPiece();
    }

    return (
        <>
        <dialog open={open} onClose={closeAddPiece}>
            <form onSubmit={addPiece}>
                <label htmlFor="title">Title</label><br />
                <input id="title" name="title" type="text" placeholder="Title Here" value={pieceTitle} onChange={(e) => setPieceTitle(e.target.value)} /><br />
                <label htmlFor="composer">Composer</label><br />
                <input id="composer" name="composer" type="text" placeholder="Composer Name" value={pieceComposer} onChange={(e) => setPieceComposer(e.target.value)} />
                <button type="submit">Submit</button>
                <button type="button" onClick={() => closeAddPiece()}>Cancel</button>
            </form>
            
        </dialog>
        </>
    );
}

export default AddPieceDialog;