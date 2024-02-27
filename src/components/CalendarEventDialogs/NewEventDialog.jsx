import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";


function NewEventDialog({ open, closeNewEvent, selectedDate, responses }) {
    const history = useHistory();
    const dispatch = useDispatch();
    // const selectedDate = useSelector(store => store.selectedDate);
    // Don't use startTime and endTime because those create a recurring event
    const selectedPiece = useSelector(store => store.selectedPiece);
    const pieces = useSelector(store => store.pieces);
    const selectedPlan = useSelector(store => store.selectedPlan);

    const [newEvent, setNewEvent] = useState({
        title: Object.keys(selectedPiece).length !== 0 ? selectedPiece.title : "",
        date: selectedDate ? selectedDate : "",
        start: "",
        end: ""
    });

    console.log("In dialog. Selected piece is:", selectedPiece);


    // event object can contain keys such as the following (more can be found at: https://fullcalendar.io/docs/event-parsing ):
    // {
    // id: maybe just grab from database? crap, need table for events...
    // title:
    // start (or startTime): (inclusive)
    // end (or endTime): (exclusive)
    //  }

    const handleChange = (e) => {

        const { name, value } = e.target;

        // currentInfo is another name for state. maybe just call it state in the future
        setNewEvent((currentInfo) => ({ ...currentInfo, [name]: value }));
    }

    const addEvent = (e) => {
        e.preventDefault();
        const payload = {
            title: newEvent.title,
            date: selectedDate ? selectedDate : newEvent.date,
            start: selectedDate ? selectedDate + "T" + newEvent.start : newEvent.date + "T" + newEvent.start,
            end: selectedDate ? selectedDate + "T" + newEvent.end : newEvent.date + "T" + newEvent.end,
            practice_plan_id: selectedPlan ? selectedPlan.id : null
        }

        // For adding plan and event at same time:
        if (Object.keys(responses).length !== 0) {
            dispatch({ type: "ADD_PLAN_AND_EVENT", payload: { newPlan: responses, newEvent: payload } });
            closeNewEvent();
            history.goBack();
            Swal.fire({
                title: "Success!",
                text: "Calendar Event Created!",
                icon: "success"
            });
        } else {
            console.log("This is the payload being sent to the add event saga:", payload);
            dispatch({ type: "ADD_CALENDAR_EVENT", payload });
            setNewEvent({
                title: "",
                date: selectedDate ? selectedDate : "",
                start: "",
                end: "",
            });
            closeNewEvent();
            Swal.fire({
                title: "Success!",
                text: "Calendar Event Created!",
                icon: "success"
            });
        }
    }

    useEffect(() => {
        setNewEvent((state) => ({ ...state, title: Object.keys(selectedPiece).length !== 0 ? selectedPiece.title : "" }));
    }, [selectedPiece]);

    return (
        <>

            <Dialog open={open}
                onClose={closeNewEvent}
                PaperProps={{
                    component: "form",
                    onSubmit: addEvent
                }}
            >
                <DialogContent>
                    <DialogTitle>Add Calendar Event</DialogTitle>
                    <InputLabel id="title-label">Select Piece</InputLabel>
                    {/* <input id="title" name="title" type="text" placeholder="Piece to Practice" value={newEvent.title} onChange={handleChange} /><br /> */}
                    <Select sx={{ minWidth: 200 }} size="small" name="title" id="title" labelId="title-label" value={newEvent.title} onChange={handleChange}>
                        {pieces.map(piece => (
                            <MenuItem key={piece.id} value={piece.title}>{piece.title}</MenuItem>
                        ))}
                    </Select><br />
                    {!selectedDate && <>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <InputLabel htmlFor="date">Date</InputLabel><br />
                            <DatePicker label="Date" id="date" name="date" type="date" value={newEvent.date} onChange={handleChange} /><br />
                        </LocalizationProvider>
                    </>}
                    <label htmlFor="start">Start</label><br />
                    <input id="start" name="start" type="time" value={newEvent.start} onChange={handleChange} /><br />
                    <label htmlFor="end">End</label><br />
                    <input id="end" name="end" type="time" value={newEvent.end} onChange={handleChange} /><br />
                    <Button type="button" color="warning" onClick={() => closeNewEvent()}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </DialogContent>
            </Dialog>

        </>
    );
}

export default NewEventDialog;