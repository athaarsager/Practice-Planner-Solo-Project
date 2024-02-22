import React, { useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // need this for dateClick
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import DashboardFooter from '../DashboardFooter/DashboardFooter';
import NewEventDialog from '../CalendarEventDialogs/NewEventDialog';
import EditEventDialog from '../CalendarEventDialogs/EditEventDialog';


export default function CalendarPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const selectedPiece = useSelector(store => store.selectedPiece);
    const responses = {};

    const [selectedDate, setSelectedDate] = useState("");
    const [selectedEvent, setSelectedEvent] = useState({});

    // create reference here. Set it to FullCalendar component (once it's rendered) by passing it to the component as a prop
    const calendarRef = useRef(null);

    const [dayView, setDayView] = useState(false);

    const [addNewEventIsOpen, setAddNewEventIsOpen] = useState(false);

    const closeNewEvent = () => setAddNewEventIsOpen(false);

    const [editEventIsOpen, setEditEventIsOpen] = useState(false);

    const closeEditedEvent = () => setEditEventIsOpen(false);

    const calendarEvents = useSelector(store => store.calendarEvents);

    const viewEventDetails = (eventInfo) => {
        setSelectedEvent(eventInfo.event.id); // just grab the id from here? eventInfo.event.id?
        // is this even the right action type? What am I trying to do here?
        dispatch({ type: "FETCH_SELECTED_EVENT", payload: parseInt(eventInfo.event.id) });
        // In final version, the dispatch above will be to a saga
        // Then will useHistory here to push to the EditEvent component
        // Will then put the showModal in the useEffect of EditEvent
        setEditEventIsOpen(true);
        
    }

    const switchView = dateClickInfo => {
        // ref will now reference the FullCalendar component and grant access to its API
        if (dayView) {
            calendarRef.current
                .getApi()
                .changeView("dayGridMonth");
            setDayView(false);
            // dispatch({ type: "RESET_SELECTED_DATE" });
        } else {
            calendarRef.current
                .getApi()
                .changeView("timeGridDay", dateClickInfo.date);
            setDayView(true);
            // Have to do some weird formatting here for the data
            // dispatch({ type: "SET_SELECTED_DATE", payload: JSON.stringify(dateClickInfo.dateStr).substring(1, 11)});
            setSelectedDate(JSON.stringify(dateClickInfo.dateStr).substring(1, 11));
        }
    }

    // need to GET all the calendar events on page load
    useEffect(() => {
        dispatch({ type: "FETCH_CALENDAR_EVENTS" });
        dispatch({ type: "CLEAR_SELECTED_PIECE"});
        console.log("This is the selected piece:", selectedPiece);
    }, []);

    return (
        // Calendar will always take up its entire container width 
        // Can manually set height via props
        // Can also use aspectRatio to adjust height
        // Apparently you don't even need to re-size the height if you have the width selected
        <div className="calendar-container">
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={calendarEvents}
                eventClick={viewEventDetails}
                // making the time display false here because it messes up the display if the event is on a Saturday
                // user will click event to view time
                displayEventTime={false}
                dateClick={switchView}
                // Creates custom button that I can use to toggle calendar view
                // has clearer text than the built-in button and lets me toggle the boolean used for conditional rendering
                customButtons={{
                    viewButton: {
                        text: "Full Calendar",
                        click: switchView
                    }
                }}
                // This adds the view navigation buttons
                headerToolbar={dayView ?
                    { center: "viewButton" } :
                    {}
                }
            />
            {dayView && <button onClick={() => setAddNewEventIsOpen(true)}>Add Practice Session</button>}
            <DashboardFooter />
            <NewEventDialog open={addNewEventIsOpen} closeNewEvent={closeNewEvent} selectedDate={selectedDate} responses={responses} />
            <EditEventDialog open={editEventIsOpen} closeEditedEvent={closeEditedEvent} selectedDate={selectedDate} />
        </div>
    );

}