const calendarEventsReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_CALENDAR_EVENTS":
            return action.payload;
        default:
            return state;
    }
}

export default calendarEventsReducer;