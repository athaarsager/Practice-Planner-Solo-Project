import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


function EditEventDialog({ }) {
    const dispatch = useDispatch();
    const selectedEvent = useSelector(store => store.selectedEvent);
    // Don't use startTime and endTime because those create a recurring event
    const [editedEvent, setEditedEvent] = useState({
        title: selectedEvent.title,
        // This line seems to be giving me the "component changing from uncontrolled to controlled" warning, but can't figure out what's causing it...
        date: Object.keys(selectedEvent).length !== 0 ? JSON.stringify(selectedEvent.start).split("T")[0].slice(1) : "2024-01-01",
        start: selectedEvent.start,
        end: selectedEvent.end
    });

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

    const submitEdits = (e) => {
        e.preventDefault();
        const payload = {
            id: selectedEvent.id,
            title: editedEvent.title,
            date: editedEvent.date,
            start: editedEvent.date + "T" + editedEvent.start,
            end: editedEvent.date + "T" + editedEvent.end
        }

        dispatch({ type: "EDIT_CALENDAR_EVENT", payload });
        setEditedEvent({
            title: "",
            date: "",
            start: "",
            end: ""
        });
        const dialog = document.querySelector("dialog");
        dialog.close();
    }

    // This function may or may not be necessary in the final version
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

    useEffect(() => {
        const dialog = document.querySelector("dialog");
        dialog.showModal();
        dispatch({ type: "FETCH_SELECTED_EVENT", payload: selectedEvent.id });

        setEditedEvent({
            title: selectedEvent.title,
            date: JSON.stringify(selectedEvent.start).split("T")[0].slice(1),
            start: formatTime(selectedEvent.start),
            end: formatTime(selectedEvent.end)
        });

    }   
    ), []};

return (
    <div>
        <dialog id="edit">
            <form onSubmit={submitEdits}>
                <label htmlFor="title">Piece</label><br />
                {/* Need to make this a dropdown */}
                <input id="title" name="title" type="text" placeholder="Piece to Practice" value={editedEvent.title} onChange={handleChange} /><br />
                {/* May want to always render an input for date so it can be changed */}
                <label htmlFor="date">Date</label><br />
                <input id="date" name="date" type="date" value={editedEvent.date} onChange={handleChange} /><br />
                <label htmlFor="start">Start</label><br />
                <input id="start" name="start" type="time" value={editedEvent.start} onChange={handleChange} /><br />
                <label htmlFor="end">End</label><br />
                <input id="end" name="end" type="time" value={editedEvent.end} onChange={handleChange} /><br />
                <button type="submit">Submit Changes</button>
                <button type="button">Delete Event</button>
                <button type="button">Go to Practice Plan</button>
            </form>
        </dialog>
    </div>
);


export default EditEventDialog;