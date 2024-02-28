import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import NewEventDialog from "../CalendarEventDialogs/NewEventDialog";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

function NewPracticePlan() {
    const dispatch = useDispatch();
    const history = useHistory();
    const pieceId = useParams().id;
    const selectedPiece = useSelector(store => store.selectedPiece);
    const newPlanProblems = useSelector(store => store.newPlanProblems);
    const onPracticePlanScreen = true;
    const selectedDate = "";

    const [addNewEventIsOpen, setAddNewEventIsOpen] = useState(false);

    const closeNewEvent = () => setAddNewEventIsOpen(false);

    const [responses, setResponses] = useState(
        {
            piece_id: pieceId,
            section: "",
            problems: "",
            plan: "",
            goal: ""
        });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setResponses((state) => ({ ...state, [name]: value }));
    }

    const submitPlan = (e) => {
        e.preventDefault();
        if (selectedPiece.event_exists === true) {
            dispatch({ type: "ADD_PLAN_FOR_EXISTING_EVENT", payload: { ...responses, event_id: selectedPiece.event_id } });
        } else {
            dispatch({ type: "ADD_PLAN", payload: responses });
        }
        history.goBack();
    }

    useEffect(() => {
        if (newPlanProblems !== "") {
            setResponses((state) => ({ ...state, problems: newPlanProblems }));
        }
        console.log("In NewPracticePlan.jsx. This is the selectedPiece:", selectedPiece);
        console.log("This is the pieceId:", pieceId);
        if (Object.keys(selectedPiece).length === 0)
        {
            dispatch({ type: "FETCH_SINGLE_PIECE", payload: pieceId });
        }
        // Would need to make a new GET route for a single piece if I want the piece to be retained on refresh...could be worth it
        return () => dispatch({ type: "CLEAR_NEW_PLAN_PROBLEMS" });
    }, [newPlanProblems]);

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Box>
                <Typography sx={{ mb: 2 }} variant="h4">New Practice Plan for {selectedPiece.title}</Typography>
                {/* Use css to inrease size of inputs. Also see what MUI provides */}
                <Box component="form" onSubmit={submitPlan}>
                    <TextField sx={{ mb: 2 }} fullWidth multiline minRows={2} id="section" name="section" label="What section are you working on?" type="text" placeholder="Your Answer Here" size="100" value={responses.section} onChange={handleChange} required/>
                    <TextField sx={{ mb: 2 }} fullWidth multiline minRows={3} id="problems" name="problems" label="What problem are the problems you need to solve/issues you need to address in this section?" type="text" placeholder="Your Answer Here" size="100" value={responses.problems} onChange={handleChange} required/>
                    <TextField sx={{ mb: 2 }} fullWidth multiline minRows={3} id="plan" name="plan" label="How will you solve these problems/address these issues?" type="text" placeholder="Your Answer Here" size="100" value={responses.plan} onChange={handleChange} required/>
                    <TextField sx={{ mb: 2 }} fullWidth multiline minRows={3} id="goal" name="goal" label="What is your goal for the end of the practice session? e.g. runs without mistakes, metronome mark etc." type="text" placeholder="Your Answer Here" size="100" value={responses.goal} onChange={handleChange} required/>
                    {!selectedPiece.event_exists &&
                        <Box sx={{ mb: 2 }}>
                            <Typography sx={{ mb: 1 }} variant="body1">Create Calendar Event? Optional</Typography>
                            <Button variant="outlined" type="button" onClick={() => setAddNewEventIsOpen(true)}>Yes</Button>
                        </Box>
                    }
                    <Button sx={{ mr: 1 }} color="error" type="button" onClick={() => history.goBack()}>Cancel</Button>
                    <Button variant="contained" type="submit">Finish Plan!</Button>
                </Box>
                <NewEventDialog open={addNewEventIsOpen} closeNewEvent={closeNewEvent} selectedDate={selectedDate} onPracticePlanScreen={onPracticePlanScreen} responses={responses} />
            </Box>
        </Box>
    );
}

export default NewPracticePlan;