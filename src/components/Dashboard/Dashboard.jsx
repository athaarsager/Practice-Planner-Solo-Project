import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import DashboardFooter from "../DashboardFooter/DashboardFooter";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AddPieceDialog from "../AddPieceDialog/AddPieceDialog";
import Swal from "sweetalert2";
import Container from  '@mui/material/Container'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



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
        <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h4" sx={{ mb: 1.5 }}>Welcome to your Dashboard, {username}!</Typography>
            {pieces.map(piece => (
                <Box>
                    <Card variant="outlined" sx={{ mb: 1.5, width: 300, display: "flex", flexDirection: "column", alignItems: "center" }} className="piece-icon" key={piece.id} >
                        <CardActionArea data-pieceid={piece.id} data-piecetitle={piece.title} onClick={goToPiecePlans}>
                            <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Typography variant="body1" data-pieceid={piece.id} data-piecetitle={piece.title}>{piece.title}</Typography>
                            <Typography variant="body1" data-pieceid={piece.id} data-piecetitle={piece.title}>By {piece.composer}</Typography>
                            </CardContent>
                        </CardActionArea>
                        <Button data-pieceid={piece.id} onClick={deletePiece}>Delete Piece</Button><br />
                    </Card>
                </Box>
            ))}
            <Button onClick={() => setAddPieceIsOpen(true)}>Add a New Piece Here!</Button><br />
            <AddPieceDialog open={addPieceIsOpen} closeAddPiece={closeAddPiece} />
            <DashboardFooter />
        </Box>
    );
}
export default Dashboard;