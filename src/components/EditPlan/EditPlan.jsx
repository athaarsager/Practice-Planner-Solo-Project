import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function EditPlan() {
    const dispatch = useDispatch();
    const history = useHistory();
    const planId = useParams().plan_id;
    const pieceId = useParams().id;
    const selectedPlan = useSelector(store => store.selectedPlan);
    const selectedPiece = useSelector(store => store.selectedPiece);

    const [responses, setResponses] = useState(
        {
            id: planId,
            piece_id: pieceId,
            section: selectedPlan.section,
            problems: selectedPlan.problems,
            plan: selectedPlan.plan,
            goal: selectedPlan.goal
        });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setResponses((state) => ({ ...state, [name]: value }));
    }

    const submitEdits = (e) => {
        e.preventDefault();
        dispatch({ type: "EDIT_PLAN", payload: responses });
        history.goBack();
    }

    useEffect(() => {
        dispatch({ type: "FETCH_SELECTED_PLAN", payload: planId });
        if (Object.keys(selectedPiece).length === 0) {
            dispatch({ type: "FETCH_SINGLE_PIECE", payload: pieceId });
        }
    }, []);

    return (
        <Grid container display="flex" flexDirection="column" alignItems="center">
            <Grid item xs={10}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Grid item xs={10}>
                    <Typography sx={{ mb: 2 }} variant="h4">Edit Plan for {selectedPiece.title}</Typography>
                    <Box component="form" onSubmit={submitEdits}>
                        <InputLabel sx={{ mb: .5, textWrap: "wrap" }} id="section-label">What section are you working on?</InputLabel>
                        <TextField sx={{ mb: 2 }} id="section" name="section" fullWidth multiline minRows={2} type="text" placeholder="Your Answer Here" size="100" value={responses.section} onChange={handleChange} />
                        <InputLabel sx={{ mb: .5, textWrap: "wrap" }} id="problems-label">What are the problems you need to solve/issues you need to address in this section?</InputLabel>
                        <TextField sx={{ mb: 2 }} id="problems" name="problems" fullWidth multiline minRows={3} type="text" placeholder="Your Answer Here" size="100" value={responses.problems} onChange={handleChange} />
                        <InputLabel sx={{ mb: .5, textWrap: "wrap" }} id="plan-label">How will you solve these problems/address these issues?</InputLabel>
                        <TextField sx={{ mb: 2 }} id="plan" name="plan" fullWidth multiline minRows={3} type="text" placeholder="Your Answer Here" size="100" value={responses.plan} onChange={handleChange} />
                        <InputLabel sx={{ mb: .5, textWrap: "wrap" }} id="goal-label">What is your goal for the end of the practice session? e.g. runs without mistakes, target metronome marking, etc.</InputLabel>
                        <TextField sx={{ mb: 2 }} id="goal" name="goal" fullWidth multiline minRows={3} type="text" placeholder="Your Answer Here" size="100" value={responses.goal} onChange={handleChange} /><br />
                        <Button sx={{ mb: 2 }} type="button" onClick={() => history.goBack()}>Back</Button>
                        <Button sx={{ mb: 2 }} variant="contained" type="submit">Submit Changes</Button>
                    </Box>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
}

export default EditPlan;