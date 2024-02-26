const calendarDateInfoReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_CALENDAR_DATE_INFO":
            return action.payload;
        case "CLEAR_CALENDAR_DATE_INFO":
            return {};
        default:
            return state;
    }
}

export default calendarDateInfoReducer;