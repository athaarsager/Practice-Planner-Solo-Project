import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function NewEventDialog({ open, closeNewEvent }) {
    const dispatch = useDispatch();
    const createdEvents = useSelector(store => store.calendarEvents);
    const selectedEvent = useSelector(store => store.selectedEvent);
    const selectedDate = useSelector(store => store.selectedDate);
    // Don't use startTime and endTime because those create a recurring event
    const [newEvent, setNewEvent] =  useState({
        title: "",
        date: selectedDate,
        start: "",
        end: ""
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
        setNewEvent((currentInfo) => ({ ...currentInfo, [name]: value }));

    }

    const addEvent = (e) => {
        e.preventDefault();
        const payload = {
            title: newEvent.title,
            date: selectedDate ? selectedDate : "",
            start: selectedDate + "T" + newEvent.start,
            end: selectedDate + "T" + newEvent.end
        }

        dispatch({ type: "ADD_CALENDAR_EVENT", payload });
        setNewEvent({
            title: "",
            date: selectedDate ? selectedDate : "",
            start: "",
            end: "",
        } );
    }

    return (
        <div>
            {/* Since "open" is a boolean value, when fed to the actual component, it is always evaluated "truthy"
            for some reason...
            SO...need to conditionally render the dialog based on the value of open OUTSIDE of the dialog component */}
            { open &&
            <dialog open={open} onClose={closeNewEvent}>
                <form onSubmit={addEvent}>
                    <label htmlFor="title">Piece</label><br />
                    {/* Need to make this a dropdown */}
                    <input id="title" name="title" type="text" placeholder="Piece to Practice" value={newEvent.title} onChange={handleChange} /><br />
                    {/* Need some conditioinal rendering here if piece is not added from calendar day screen. Something like: */}
                    {/* !selectedEvent && */}
                    {/* insert label and input for date here */}
                    <label htmlFor="start">Start</label><br />
                    <input id="start" name="start" type="time" value={newEvent.start} onChange={handleChange} /><br />
                    <label htmlFor="end">End</label><br />
                    <input id="end" name="end" type="time" value={newEvent.end} onChange={handleChange} /><br />
                    <input type="submit" />
                </form>
            </dialog>
}
        </div>
    );
}

export default NewEventDialog;