import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchCalendarEvents() {
    try {
        const fetchCalendarResponse = yield axios.get("/api/calendar_events");
        yield put({ type:"SET_CALENDAR_EVENTS", payload: fetchCalendarResponse});
    } catch(error) {
        console.error("ERROR in fetchCalendarEvents saga:", error);
    }
}

function* calendarEventsSaga() {
    yield takeLatest("FETCH_CALENDAR_EVENTS", fetchCalendarEvents);
}

export default calendarEventsSaga;