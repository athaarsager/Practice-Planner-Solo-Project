import React, { useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // need this for dateClick
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';


export default function CalendarPage() {
  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEvent, setSelectedEvent] = useState({});

  // create reference here. Set it to FullCalendar component (once it's rendered) by passing it to the component as a prop
  const calendarRef = useRef(null);

  const [dayView, setDayView] = useState(false);

  const calendarEvents = useSelector(store => store.calendarEvents);

  const viewEventDetails = (eventInfo) => {
    setSelectedEvent(eventInfo.event.id); // just grab the id from here? eventInfo.event.id?
    dispatch({type: "SET_EVENT", payload: selectedEvent});
    // In final version, the dispatch above will be to a saga
    // Then will useHistory here to push to the EditEvent component
    // Will then put the showModal in the useEffect of EditEvent
  }

  const switchView = dateClickInfo => {
    // ref will now reference the FullCalendar component and grant access to its API
    if (dayView) {
      calendarRef.current
        .getApi()
        .changeView("dayGridMonth");
      setDayView(false);
    } else {
      calendarRef.current
        .getApi()
        .changeView("timeGridDay", dateClickInfo.date);
      setDayView(true);
      setSelectedDate(dateClickInfo.dateStr);
    }
  }

  const displayModal = () => {
    const dialog = document.querySelector("dialog");
    dialog.showModal();
  }

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
      {dayView && <button onClick={displayModal}>Add Practice Session</button>}
     
      
    </div>
  );

}