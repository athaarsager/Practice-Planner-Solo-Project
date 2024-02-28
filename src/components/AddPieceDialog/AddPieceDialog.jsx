import { useDispatch } from "react-redux";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

function AddPieceDialog({ open, closeAddPiece }) {
    const dispatch = useDispatch();

    const [pieceTitle, setPieceTitle] = useState("");
    const [pieceComposer, setPieceComposer] = useState("");

    const addPiece = (e) => {
        e.preventDefault();
        dispatch({ type: "ADD_PIECE", payload: { title: pieceTitle, composer: pieceComposer } });
        setPieceTitle("");
        setPieceComposer("");
        closeAddPiece();
    }

    return (
        <>
            <Dialog open={open}
                onClose={closeAddPiece}
                PaperProps={{
                    component: "form",
                    onSubmit: addPiece
                }}
            >
                <DialogTitle>Add a New Piece!</DialogTitle>
                <DialogContent>
                    <TextField sx={{mb: 1.5, mt: 1}} id="title" name="title" label="Title" type="text" placeholder="Title Here" value={pieceTitle} onChange={(e) => setPieceTitle(e.target.value)} required /><br />
                    <TextField sx={{mb: 1.5}} id="composer" name="composer" label="Composer" type="text" placeholder="Composer Name" value={pieceComposer} onChange={(e) => setPieceComposer(e.target.value)} required />
                </DialogContent>
                <DialogActions>
                    <Button color="warning" type="button" onClick={() => closeAddPiece()}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddPieceDialog;