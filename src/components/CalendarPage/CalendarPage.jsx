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
import "./CalendarPage.css"
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";



export default function CalendarPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const selectedPiece = useSelector(store => store.selectedPiece);
    const calendarDateInfo = useSelector(store => store.calendarDateInfo);
    const dayView = useSelector(store => store.dayView);
    const responses = {};

    // It appears I do still use the selectedDate object as deleting it breaks everything. So...don't touch!
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedEvent, setSelectedEvent] = useState({});

    // create reference here. Set it to FullCalendar component (once it's rendered) by passing it to the component as a prop
    const calendarRef = useRef(null);

    //const [dayView, setDayView] = useState(false);

    const [addNewEventIsOpen, setAddNewEventIsOpen] = useState(false);

    const closeNewEvent = () => setAddNewEventIsOpen(false);

    const [editEventIsOpen, setEditEventIsOpen] = useState(false);

    const closeEditedEvent = () => setEditEventIsOpen(false);

    const calendarEvents = useSelector(store => store.calendarEvents);

    const viewEventDetails = (eventInfo) => {
        setSelectedEvent(eventInfo.event.id); // just grab the id from here? eventInfo.event.id?
        // is this even the right action type? What am I trying to do here?
        dispatch({ type: "FETCH_SELECTED_EVENT", payload: parseInt(eventInfo.event.id) });

        setEditEventIsOpen(true);

    }

    const switchView = dateClickInfo => {
        // ref will now reference the FullCalendar component and grant access to its API
        if (dayView) {
            calendarRef.current
                .getApi()
                .changeView("dayGridMonth");
            dispatch({ type: "UNSET_TO_DAYVIEW" });
            dispatch({ type: "CLEAR_CALENDAR_DATE_INFO" });
            setAddNewEventIsOpen(false);
            setEditEventIsOpen(false);
        } else {
            calendarRef.current
                .getApi()
                .changeView("timeGridDay", dateClickInfo.date);
            dispatch({ type: "SET_TO_DAYVIEW" });
            // set dateClickInfo in store here!
            dispatch({ type: "SET_CALENDAR_DATE_INFO", payload: dateClickInfo });

            // Have to do some weird formatting here for the data
            dispatch({ type: "SET_SELECTED_DATE", payload: JSON.stringify(dateClickInfo.dateStr).substring(1, 11) });
            //setSelectedDate(JSON.stringify(dateClickInfo.dateStr).substring(1, 11));
        }
    }

    const goToCalendarDay = (dayView, dateInfo) => {
        if (!dayView || Object.keys(dateInfo).length === 0) {
            return;
        } // since this always runs on page start, need to make sure it returns immediately if dayView is false
        console.log("This is the dateInfo:", dateInfo);
        // remember, dateInfo is equal to the dateClickInfo object as that is what I am feeding this function
        calendarRef.current
            .getApi()
            .changeView("timeGridDay", dateInfo.date);
        setSelectedDate(JSON.stringify(dateInfo.dateStr).substring(1, 11));
        console.log("This is the dateClickInfo:", dateInfo);
    }

    // need to GET all the calendar events on page load
    useEffect(() => {
        dispatch({ type: "FETCH_CALENDAR_EVENTS" });
        dispatch({ type: "CLEAR_SELECTED_PIECE" });
        dispatch({ type: "FETCH_PIECES" }); // Need to do this so that the dropdowns in the dialogs load correctly even on refresh
        console.log("This is the value of dayView:", dayView);
        console.log("This is the value of editEventIsOpen:", editEventIsOpen);
        // calendarDateInfo is the inputDate, which is equal to the dateClickInfo
        goToCalendarDay(dayView, calendarDateInfo);
    }, [dayView, calendarDateInfo]); // update page based on value of dayView and calendarDateInfo

    return (
        // Calendar will always take up its entire container width 
        // Can manually set height via props
        // Can also use aspectRatio to adjust height
        // Apparently you don't even need to re-size the height if you have the width selected
        <Grid container display="flex" flexDirection="column" alignItems="center">
            <Grid item xs={10} >
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Grid xs={12} sx={{ mb: 2 }} item className="calendar-container">
                        <FullCalendar
                            ref={calendarRef}
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            initialView={dayView ? "timeGridDay" : "dayGridMonth"}
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
                                    text: "Back to Full Calendar",
                                    click: switchView
                                }
                            }}
                            // This adds the view navigation buttons
                            headerToolbar={dayView ?
                                { center: "viewButton" } :
                                {}
                            }
                        />
                        {dayView && 
                        <Box display="flex" justifyContent="center">
                        <Button color="success" variant="outlined" sx={{ mt: 2 }} onClick={() => setAddNewEventIsOpen(true)}>Schedule a Practice Session!</Button>
                        </Box>
                        }
                        <NewEventDialog open={addNewEventIsOpen} closeNewEvent={closeNewEvent} selectedDate={selectedDate} responses={responses} />
                        <EditEventDialog open={editEventIsOpen} closeEditedEvent={closeEditedEvent} selectedDate={selectedDate} />
                    </Grid>
                    <DashboardFooter />
                </Box>
            </Grid>
        </Grid>
    );

}