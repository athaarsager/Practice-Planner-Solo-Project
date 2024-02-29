import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import NewEventDialog from "../CalendarEventDialogs/NewEventDialog";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function ReviewPlan() {
    const dispatch = useDispatch();
    const history = useHistory();
    const planId = useParams().plan_id;
    const pieceId = useParams().id;
    const selectedPlan = useSelector(store => store.selectedPlan);
    const selectedPiece = useSelector(store => store.selectedPiece);
    const [addNewEventIsOpen, setAddNewEventIsOpen] = useState(false);
    const closeNewEvent = () => setAddNewEventIsOpen(false);
    const onPracticePlanScreen = true; // Technically this is the review page, but this variable controls the functionality I want
    const selectedDate = "";
    const responses = {};

    // steps for navigating to correct calendar day/event from this page
    // set calendarDateInfo to correct date somehow...
    const goToCalendarPage = () => {
        // set dayView to true
        dispatch({ type: "SET_TO_DAYVIEW" });
        // set selectedEvent to correct event
        dispatch({ type: "GET_EVENT_FROM_PLAN_ID", payload: selectedPlan.id });
        // This grabs the event and sets calendarDateInfo to the event's date. Theoretically
        history.push("/dashboard/calendar");
    }

    const deletePlan = (e) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            iconColor: "#ffa726",
            confirmButtonColor: "#2680A6",
            cancelButtonColor: "#f44336",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({ type: "DELETE_PLAN", payload: { planId: e.target.dataset.planid, pieceId } });
                history.goBack();
                Swal.fire({
                    title: "Deleted!",
                    text: "Your practice plan has been deleted.",
                    icon: "success",
                    iconColor: "#26a68c",
                    confirmButtonColor: "#2680A6"
                });
            }
        });

    }

    useEffect(() => {

        dispatch({ type: "FETCH_SELECTED_PLAN", payload: planId });
        console.log("This is the selectedPlan:", selectedPlan);
        if (Object.keys(selectedPiece).length === 0) {
            dispatch({ type: "FETCH_SINGLE_PIECE", payload: pieceId });
        }

    }, [dispatch]); // Putting dispatch here fixes infinite loop. Not 100% sure on the logic...

    return (
        <Grid container display="flex" flexDirection="column" alignItems="center">
            <Grid item xs={10}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography sx={{ mb: 3 }} variant="h4">Review plan for {selectedPiece.title}</Typography>
                    <Paper sx={{ paddingInline: 5, paddingTop: 2, maxWidth: 800, mb: 2 }}>
                        <Typography variant="body1"><strong>What section are you working on?</strong></Typography>
                        <Typography sx={{ mb: 1 }} variant="body2">{selectedPlan.section}</Typography>
                        <Typography variant="body1"><strong>What are the problems you need to solve/issues you need to address in this section?</strong></Typography>
                        <Typography sx={{ mb: 1 }} variant="body2">{selectedPlan.problems}</Typography>
                        <Typography variant="body1"><strong>How will you solve these problems/adderss these issues?</strong></Typography>
                        <Typography sx={{ mb: 1 }} variant="body2">{selectedPlan.plan}</Typography>
                        <Typography variant="body1"><strong>What is your goal for the end of the practice session?</strong></Typography>
                        <Typography sx={{ mb: 1 }} variant="body2">{selectedPlan.goal}</Typography>
                        <Button onClick={() => history.goBack()}>Back</Button>
                        <Button onClick={() => history.push(`/${pieceId}/practice_entries/review_plan/${planId}/edit`)}>Edit</Button>
                    </Paper>
                    {!selectedPlan.calendar_event_id ?
                            <Button onClick={() => setAddNewEventIsOpen(true)}>Add To Calendar</Button> :
                            <Button onClick={goToCalendarPage}>View Calendar Event</Button>
                        }
                    <Button sx={{ mb: 2 }} color="error" data-planid={selectedPlan.id} onClick={deletePlan}>Delete Plan</Button>
                    <NewEventDialog open={addNewEventIsOpen} closeNewEvent={closeNewEvent} selectedDate={selectedDate} onPracticePlanScreen={onPracticePlanScreen} responses={responses} />
                </Box>
            </Grid>
        </Grid>
    );
}
export default ReviewPlan;