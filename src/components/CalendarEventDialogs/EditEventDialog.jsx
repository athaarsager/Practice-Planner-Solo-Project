import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function EditEventDialog({ open, closeEditedEvent, selectedDate }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const selectedEvent = useSelector(store => store.selectedEvent);
    const pieces = useSelector(store => store.pieces);
    // Don't use startTime and endTime because those create a recurring event
    const [editedEvent, setEditedEvent] = useState({
        title: selectedEvent.title,
        // This line seems to be giving me the "component changing from uncontrolled to controlled" warning, but can't figure out what's causing it...
        date: Object.keys(selectedEvent).length !== 0 ? JSON.stringify(selectedEvent.start).split("T")[0].slice(1) : "",
        start: selectedEvent.start,
        end: selectedEvent.end
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

    const updatePieceTitle = (e) => {
        // Figure out how to get the id and title in the value and split it for setting state here
        const [pieceId, pieceTitle] = e.target.value.split(","); // Efficient way of creating new variables via ChatGPT
        console.log("pieceId is:", pieceId);
        console.log("pieceTitle is:", pieceTitle);
        setPieceId(pieceId);
        setEditedEvent((state) => ({...state, title: pieceTitle}));
        // handleChange(e);
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

        closeEditedEvent();
    }

    const deleteEvent = () => {
        dispatch({ type: "DELETE_CALENDAR_EVENT", payload: selectedEvent.id });
        closeEditedEvent();
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

        if (Object.keys(selectedEvent).length !== 0) {

            setEditedEvent({
                id: selectedEvent.id,
                title: selectedEvent.title,
                date: selectedEvent ? JSON.stringify(selectedEvent.start).split("T")[0].slice(1) : "",
                start: formatTime(selectedEvent.start),
                end: formatTime(selectedEvent.end)
            });
        }

    }, [selectedEvent]); // Need to put selectedEvent here so it actually displays in dialog. Page must not load with it yet?

    return (
        <div>
            <dialog open={open} onClose={closeEditedEvent}>
                <form onSubmit={submitEdits}>
                    <label htmlFor="title">Piece</label><br />
                    {/* Need to make this a dropdown */}
                    {/* <input id="title" name="title" type="text" placeholder="Piece to Practice" value={editedEvent.title} onChange={handleChange} /><br /> */}
                    <select name="title" id="title" value={pieceId + "," + selectedEvent.title} onChange={updatePieceTitle}>
                        <option value="" disabled hidden>Select Piece</option>
                        {pieces.map(piece => (
                            <option key={piece.id} value={`${piece.id},${piece.title}`}>{piece.title}</option>
                        ))}
                    </select><br />
                    <label htmlFor="date">Date</label><br />
                    <input id="date" name="date" type="date" value={editedEvent.date} onChange={handleChange} /><br />
                    <label htmlFor="start">Start</label><br />
                    <input id="start" name="start" type="time" value={editedEvent.start} onChange={handleChange} /><br />
                    <label htmlFor="end">End</label><br />
                    <input id="end" name="end" type="time" value={editedEvent.end} onChange={handleChange} /><br />
                    <button type="button" onClick={closeEditedEvent}>Cancel</button>
                    <button onClick={deleteEvent} type="button">Delete Event</button>
                    <button type="submit">Submit Changes</button>
                    {selectedEvent.practice_plan_id ?
                        <button type="button">Go to Practice Plan</button> :
                        <button type="button" onClick={() => history.push(`/${pieceId}/practice_entries/new_plan`)}>Add Practice Plan</button>
                    }
                </form>
            </dialog>

        </div>
    );
}

export default EditEventDialog; 