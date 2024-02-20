import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchCalendarEvents() {
    try {
        const fetchCalendarResponse = yield axios.get("/api/calendar_events");
        yield put({ type: "SET_CALENDAR_EVENTS", payload: fetchCalendarResponse });
    } catch (error) {
        console.error("ERROR in fetchCalendarEvents saga:", error);
    }
}

function* addCalendarEvent(action) {
    try {
        yield axios.post("/api/calendar_events", action.payload);
        yield put({ type: "FETCH_CALENDAR_EVENTS" });
    } catch (error) {
        console.error("ERROR in addCalendarEvent saga:", error);
    }
}

function* editCalendarEvent(action) {
    try {
        yield axios.put(`/api/calendar_events/${action.payload.id}`, action.payload);
        yield put( {type: "FETCH_CALENDAR_EVENTS" });
    } catch (error) {
        console.error("ERROR in editCalendarEvent saga:", error);
    }
}

function* calendarEventsSaga() {
    yield takeLatest("FETCH_CALENDAR_EVENTS", fetchCalendarEvents);
    yield takeLatest("ADD_CALENDAR_EVENT", addCalendarEvent);
    yield takeLatest("EDIT_CALENDAR_EVENT", editCalendarEvent);
}

export default calendarEventsSaga;