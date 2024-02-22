import { useDispatch } from "react-redux";
import { useState } from "react";
function AddPieceDialog({open, closeAddPiece}) {
    const dispatch = useDispatch();

    const [pieceTitle, setPieceTitle] = useState("");
    const [pieceComposer, setPieceComposer] = useState("");

    return (
        <>
        <dialog open={open} onClose={closeAddPiece}>
            <form>
                <label htmlFor="title">Title</label><br />
                <input id="title" name="title" type="text" placeholder="Title Here" value={pieceTitle} onChange={(e) => setPieceTitle(e.target.value)} /><br />
                <label htmlFor="composer">Composer</label><br />
                <input id="composer" name="composer" type="text" placeholder="Composer Name" value={pieceComposer} onChange={(e) => setPieceComposer(e.target.value)} />
                <button type="submit">Submit</button>
                <button type="button">Cancel</button>
            </form>
            
        </dialog>
        </>
    );
}

export default AddPieceDialog;