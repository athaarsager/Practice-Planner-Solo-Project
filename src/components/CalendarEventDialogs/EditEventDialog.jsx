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

function EditEventDialog({ open, closeEditedEvent, selectedDate }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const selectedEvent = useSelector(store => store.selectedEvent);
    const pieces = useSelector(store => store.pieces);
    // Don't use startTime and endTime because those create a recurring event
    const [editedEvent, setEditedEvent] = useState({
        title: Object.keys(selectedEvent).length !== 0 ? selectedEvent.title : "",
        // This line seems to be giving me the "component changing from uncontrolled to controlled" warning, but can't figure out what's causing it...
        date: Object.keys(selectedEvent).length !== 0 ? JSON.stringify(selectedEvent.start).split("T")[0].slice(1) : "",
        start: Object.keys(selectedEvent).length !== 0 ? selectedEvent.start : "",
        end: Object.keys(selectedEvent).length !== 0 ? selectedEvent.end : ""
    });

    const [pieceId, setPieceId] = useState("");

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
        setEditedEvent((currentInfo) => ({ ...currentInfo, [name]: value }));

    }

    const handleDateChange = (date) => {
        setEditedEvent((state) => ({ ...state, date }));
    }

    const handleStartChange = (time) => {
        setEditedEvent((state) => ({ ...state, start: time }));
    }

    const handleEndChange = (time) => {
        setEditedEvent((state) => ({ ...state, end: time }));
    }

    // check if editedEvent.title === selectedEvent.title
    // if different, check if selectedEvent had a plan_id.
    // if it did, send off a PUT request to change the piece_id to the new piece_id

    const formatDate = (input) => {
        return String(input).substring(0, 15);
    }

    const formatTime = (input) => {
        const hours = JSON.stringify(input).split("T")[1].substring(0, 2);
        //alert(`startHours: ${startHours}`);
        const minutes = JSON.stringify(input).split("T")[1].substring(3, 5);
        //alert(`startMinutes: ${startMinutes}`);
        const date = new Date();
        let offset = date.getTimezoneOffset();
        offset = offset / 60;
        let decimal = (parseFloat(`${hours}.${minutes}`) - offset).toFixed(2);
        if (parseFloat(decimal) < 0) {
            decimal = (parseFloat(decimal) + 24).toFixed(2);
            decimal = String(decimal);
        }
        const formattedTime = decimal.split(".")[0] + ":" + decimal.split(".")[1];
        return formattedTime;
    }

    const submitEdits = (e) => {
        e.preventDefault();
        const payload = {
            id: selectedEvent.id,
            title: editedEvent.title,
            date: editedEvent.date.$d,
            start: formatDate(editedEvent.date.$d) + "T" + formatTime(editedEvent.start.$d),
            end: formatDate(editedEvent.date.$d) + "T" + formatTime(editedEvent.end.$d)
        }

        if (editedEvent.title !== selectedEvent.title && selectedEvent.piece_id) {
            console.log("This is the editedEvent's title:", editedEvent.title);
            console.log("This is the selectedEvent's title:", selectedEvent.title);
            // Need to do a GET, first?
            // Need to send over new piece id
            console.log("This is the payload I'm sending to update piece name:",);
            dispatch({ type: "EDIT_PLAN_PIECE", payload: { new_piece_title: editedEvent.title, plan_id: selectedEvent.practice_plan_id } });
        }

        dispatch({ type: "EDIT_CALENDAR_EVENT", payload });
        setEditedEvent({
            title: "",
            date: "",
            start: "",
            end: ""
        });

        closeEditedEvent();
    }

    const deleteEvent = () => {

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
                dispatch({ type: "DELETE_CALENDAR_EVENT", payload: selectedEvent.id });
                closeEditedEvent();
                Swal.fire({
                    title: "Deleted!",
                    text: "Your practice session has been deleted.",
                    icon: "success"
                });
            }
        });

    }

    const addPracticePlan = () => {
        dispatch({ type: "SET_SELECTED_PIECE", payload: { id: selectedEvent.piece_id, title: editedEvent.title, event_exists: true, event_id: selectedEvent.id } });
        history.push(`/${selectedEvent.piece_id}/practice_entries/new_plan`);
    }

    const goToPracticePlan = () => {
        dispatch({ type: "SET_SELECTED_PIECE", payload: { id: selectedEvent.piece_id, title: editedEvent.title, event_exists: true, event_id: selectedEvent.id } });
        history.push(`/${selectedEvent.piece_id}/practice_entries/review_plan/${selectedEvent.practice_plan_id}`);
    }

    useEffect(() => {

        if (Object.keys(selectedEvent).length !== 0) {
            setEditedEvent({
                id: selectedEvent.id,
                piece_id: selectedEvent.piece_id,
                title: selectedEvent.title,
                date: dayjs(selectedEvent.date),
                // date: selectedEvent ? JSON.stringify(selectedEvent.start).split("T")[0].slice(1) : "",
                start: dayjs(selectedEvent.start),
                // start: formatTime(selectedEvent.start),
                end: dayjs(selectedEvent.end)
                // end: formatTime(selectedEvent.end)
            });
        }
        console.log("This is the editedEvent:", editedEvent);
        console.log("This is the selectedEvent:", selectedEvent);
    }, [selectedEvent]); // Need to put selectedEvent here so it actually displays in dialog. Page must not load with it yet?

    return (
        <>
            <Dialog open={open}
                onClose={closeEditedEvent}
                PaperProps={{
                    component: "form",
                    onSubmit: submitEdits
                }}
            >
                <DialogContent>
                    <DialogTitle>Edit Calendar Event</DialogTitle>
                    <InputLabel htmlFor="title-label">Piece</InputLabel><br />
                    <Select sx={{ minWidth: 200, mb: 2 }} size="small" name="title" id="title" labelId="title-label" value={editedEvent.title} onChange={handleChange}>
                        {pieces.map(piece => (
                            <MenuItem key={piece.id} value={piece.title}>{piece.title}</MenuItem>
                        ))}
                    </Select><br />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker sx={{ mb: 2 }} slotProps={{ textField: { required: true, name: "date" } }} id="date" name="date" label="Date" type="date" value={editedEvent.date} onChange={handleDateChange} /><br />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker sx={{ mb: 2 }} slotProps={{ textField: { required: true, name: "start" } }} id="start" name="start" label="Start" type="time" value={editedEvent.start} onChange={handleStartChange} /><br />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker sx={{ mb: 2 }} slotProps={{ textField: { required: true, name: "end" } }} id="end" name="end" label="End" type="time" value={editedEvent.end} onChange={handleEndChange} /><br />
                    </LocalizationProvider>
                    <Button type="button" onClick={closeEditedEvent}>Cancel</Button>
                    <Button color="error" onClick={deleteEvent} type="button">Delete Event</Button>
                    <Button type="submit">Submit Changes</Button>
                    {selectedEvent.practice_plan_id ?
                        <Button type="button" onClick={goToPracticePlan}>Go to Practice Plan</Button> :
                        <Button type="button" onClick={addPracticePlan}>Add Practice Plan</Button>
                    }
                </DialogContent>
            </Dialog>

        </>
    );
}

export default EditEventDialog; 