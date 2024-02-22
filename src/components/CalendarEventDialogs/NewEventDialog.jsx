import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function NewEventDialog({ open, closeNewEvent, selectedDate, responses }) {
    const dispatch = useDispatch();
    // const selectedDate = useSelector(store => store.selectedDate);
    // Don't use startTime and endTime because those create a recurring event
    const selectedPiece = useSelector(store => store.selectedPiece);
    const plans = useSelector(store => store.plans);

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
            end: selectedDate ? selectedDate + "T" + newEvent.end : newEvent.date + "T" + newEvent.end
        }

        // Make this all ONE dispatch
        if (Object.keys(responses).length !== 0) {
            dispatch({type: "ADD_PLAN_AND_EVENT", payload: {newPlan: responses, newEvent: payload}});
            closeNewEvent();
        } else {
    

        dispatch({ type: "ADD_CALENDAR_EVENT", payload });
        setNewEvent({
            title: "",
            date: selectedDate ? selectedDate : "",
            start: "",
            end: "",
        });

        closeNewEvent();
    }
    }

    useEffect(() => {
        console.log("useEffect fired! the selectedPiece is:", selectedPiece);
        setNewEvent((state) => ({ ...state, title: Object.keys(selectedPiece).length !== 0 ? selectedPiece.title : ""}));
        console.log("newEvent is:", newEvent); // Not updating fast enough with React life cycle again or something...
    }, [selectedPiece]);

    return (
        <div>

            <dialog open={open} onClose={closeNewEvent}>
                <form onSubmit={addEvent}>
                    <label htmlFor="title">Piece</label><br />
                    {/* Need to make this a dropdown */}
                    <input id="title" name="title" type="text" placeholder="Piece to Practice" value={newEvent.title} onChange={handleChange} /><br />
                    {/* Need some conditioinal rendering here if piece is not added from calendar day screen. Something like: */}
                    {/* !selectedEvent && */}
                    {/* insert label and input for date here */}
                    {!selectedDate && <>
                        <label htmlFor="date">Date</label><br />
                        <input id="date" name="date" type="date" value={newEvent.date} onChange={handleChange} /><br />
                    </>}
                    <label htmlFor="start">Start</label><br />
                    <input id="start" name="start" type="time" value={newEvent.start} onChange={handleChange} /><br />
                    <label htmlFor="end">End</label><br />
                    <input id="end" name="end" type="time" value={newEvent.end} onChange={handleChange} /><br />
                    <input type="submit" />
                    <button type="button" onClick={() => closeNewEvent()}>Cancel</button>
                </form>
            </dialog>

        </div>
    );
}

export default NewEventDialog;