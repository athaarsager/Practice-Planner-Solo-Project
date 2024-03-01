import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
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
import { getFormControlLabelUtilityClasses } from "@mui/material";




function NewEventDialog({ open, closeNewEvent, selectedDate, responses }) {
    const history = useHistory();
    const dispatch = useDispatch();
    // const selectedDate = useSelector(store => store.selectedDate);
    // Don't use startTime and endTime because those create a recurring event
    const selectedPiece = useSelector(store => store.selectedPiece);
    const pieces = useSelector(store => store.pieces);
    const selectedPlan = useSelector(store => store.selectedPlan);
    const pieceId = useParams().id;


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

    const handleDateChange = (date) => {
        setNewEvent((state) => ({ ...state, date }));
    }

    const handleStartChange = (time) => {
        setNewEvent((state) => ({ ...state, start: time }));
    }

    const handleEndChange = (time) => {
        setNewEvent((state) => ({ ...state, end: time }));
    }

    // day.js screwed up how dates are passed between dialog and calendar, so have to use this function to fix it (thanks timezones)
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
        //alert(`formattedStart: ${formattedStart}`);
        return formattedTime;
    }

    // Get to format date now too. yay...
    const formatDate = (input) => {
        return String(input).substring(0, 15);
    }

    const addEvent = (e) => {
        e.preventDefault();
        // console.log("This is the newEvent start:", newEvent.start.$d);
        // console.log("This is the newEvent end:", newEvent.end);
        // console.log("This is the full newEvent date:", newEvent.date.$d);
        // console.log("This is the split newEvent date:", String(newEvent.date.$d).substring(0, 15));
        // console.log("This is the value of responses:", responses);
        const payload = {
            title: newEvent.title,
            date: selectedDate ? selectedDate : newEvent.date.$d,
            start: selectedDate ? selectedDate + "T" + formatTime(newEvent.start.$d) : formatDate(newEvent.date.$d) + "T" + formatTime(newEvent.start.$d),
            end: selectedDate ? selectedDate + "T" + formatTime(newEvent.end.$d) : formatDate(newEvent.date.$d) + "T" + formatTime(newEvent.end.$d),
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
                icon: "success",
                iconColor: "#26a68c",
                confirmButtonColor: "#2680A6"
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
                icon: "success",
                iconColor: "#26a68c",
                confirmButtonColor: "#2680A6"
            });
        }
    }

    useEffect(() => {
        if (pieceId) {
            dispatch({ type: "FETCH_PIECES"});
            // dispatch({ type: "FETCH_SINGLE_PIECE", payload: pieceId });
        }
        console.log("In newEvent useEffect");
        console.log("This is the selected plan", selectedPlan);
        setNewEvent((state) => ({ ...state, title: Object.keys(selectedPiece).length !== 0 ? selectedPiece.title : "" }));
    }, [dispatch, selectedPiece]);

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
                    <Select sx={{ minWidth: 200, mb: 2 }} size="small" name="title" id="title" labelId="title-label" value={newEvent.title} onChange={handleChange} required>
                        {pieces.map(piece => (
                            <MenuItem key={piece.id} value={piece.title}>{piece.title}</MenuItem>
                        ))}
                    </Select><br />
                    {!selectedDate && <>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker sx={{ mb: 2 }} slotProps={{ textField: { required: true, name: "date" } }} label="Date" id="date" type="date" value={newEvent.date} onChange={handleDateChange} required /><br />
                        </LocalizationProvider>
                    </>}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker sx={{ mb: 2 }} slotProps={{ textField: { required: true, name: "start" } }} label="Start" id="start" type="time" value={newEvent.start} onChange={handleStartChange} required /><br />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker sx={{ mb: 2 }} slotProps={{ textField: { required: true, name: "end" } }} label="End" id="end" type="time" value={newEvent.end} onChange={handleEndChange} required/>
                    </LocalizationProvider>< br />
                    <Button type="button" color="warning" onClick={() => closeNewEvent()}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </DialogContent>
            </Dialog>

        </>
    );
}

export default NewEventDialog;