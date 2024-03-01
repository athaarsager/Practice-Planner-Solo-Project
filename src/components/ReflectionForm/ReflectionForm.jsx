import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function ReflectionForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const pieceId = useParams().id;
    const planId = useParams().plan_id;
    const selectedReflection = useSelector(store => store.selectedReflection);
    const [wentWell, setWentWell] = useState("");
    const [needsWork, setNeedsWork] = useState("");

    const submitReflection = (e) => {
        e.preventDefault();

        if (Object.keys(selectedReflection).length === 0) {
            const payload = {
                went_well: wentWell,
                needs_work: needsWork,
                plan_id: planId,
            }
            dispatch({ type: "ADD_REFLECTION", payload });
            console.log("New reflection dispatched!");
        } else {
            const payload = {
                id: selectedReflection.id,
                went_well: wentWell,
                needs_work: needsWork,
                plan_id: planId
            }
            dispatch({ type: "EDIT_REFLECTION", payload });
            console.log("Edit dispatched!");
        }
        history.goBack();
    }

    const exportToNewPlan = (e) => {
        e.preventDefault();
        const payload = {
            went_well: wentWell,
            needs_work: needsWork,
            plan_id: planId,
        }
        dispatch({ type: "ADD_REFLECTION", payload });
        dispatch({ type: "SET_NEW_PLAN_PROBLEMS", payload: needsWork });
        history.push(`/${pieceId}/practice_entries/new_plan`);
    }

    useEffect(() => {
        setWentWell(Object.keys(selectedReflection).length === 0 ? "" : selectedReflection.went_well);
        setNeedsWork(Object.keys(selectedReflection).length === 0 ? "" : selectedReflection.needs_work);
    }, [selectedReflection]);

    return (
        <Grid container display="flex" flexDirection="column" alignItems="center">
            <Grid item xs={10}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Grid item xs={10}>
                        <Typography sx={{ mb: 2 }} variant="h4">Reflection</Typography>
                        <Box>
                            <Box component="form" onSubmit={submitReflection}>
                                <TextField sx={{ mb: 2 }} fullWidth multiline minRows={4} id="went-well" name="went-well" label="What went well this session?" type="text" placeholder="Your Answer Here!" value={wentWell} onChange={(e) => setWentWell(e.target.value)} required />
                                <TextField sx={{ mb: 2 }} fullWidth multiline minRows={4} id="needs_work" name="needs_work" label="What still needs work?" type="text" placeholder="Your Answer Here!" value={needsWork} onChange={(e) => setNeedsWork(e.target.value)} required /><br />
                                <Box sx={{ mb: 1 }} display="flex" justifyContent="center">
                                    <Button color="error" type="button" onClick={() => history.goBack()}>Back</Button>
                                    <Button onClick={exportToNewPlan}>Export to New Plan</Button>
                                </Box>
                                <Box display="flex" justifyContent="center">
                                    {Object.keys(selectedReflection).length === 0 ?
                                        <Button variant="contained" type="submit">Save Reflection!</Button> :
                                        <Button variant="contained" type="submit">Save Edits!</Button>
                                    }
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
}

export default ReflectionForm;